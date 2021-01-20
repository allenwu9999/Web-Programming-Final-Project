const Query = {
  // async get_popular_topics(parent, args, { Topic }, info){
  //   let pop_topics = []
  //   if(!args.categories){
  //     pop_topics = await Topic.find().sort({ score: "descending" })
  //   }
  //   else{
  //     let len = args.categories.length
  //     for(let i = 0; i < len; i++){
  //       let tmp_arr = await Topic.find({ category: args.categories[i] })
  //       pop_topics = pop_topics.concat(tmp_arr)
  //     }
  //     pop_topics = pop_topics.sort((a, b) => (b.score - a.score))
  //   }
  //   return pop_topics
  // },
  // async get_category(parent, args, { Topic }, info){
  //   let topic = await Topic.find({ topic_name: args.topic_name })
  //   return topic[0].category
  // },
  async get_popular_topics(parent, args, { Topic }, info){
    let topics = await Topic.find().sort({ score: "descending" })
    topics = topics.slice(0, 6)

    let groups = []
    for(let i = 0; i < topics.length; i++){
      if(!groups.includes(topics[i].category)) groups.push(topics[i].category)
    }

    let pop_topics = []
    for(let i = 0; i < groups.length; i++){
      pop_topics.push({
        group: groups[i],
        items: (topics.filter(e => e.category === groups[i])).map(elem => elem.topic_name)
      })
    }

    // console.log(pop_topics)

    return pop_topics
  },
  async get_topics(parent, args, { Topic }, info){
    let topics = await Topic.find().sort({ score: "descending" })

    let names = []
    for(let i = 0; i < topics.length; i++){
      if(!names.includes(topics[i].category)) names.push(topics[i].category)
    }

    let res_topics = []
    for(let i = 0; i < names.length; i++){
      res_topics.push({
        name: names[i],
        subtopics: (topics.filter(e => e.category === names[i])).map(elem => elem.topic_name)
      })
    }

    // console.log(pop_topics)

    return res_topics
  },
  async get_explore_topics(parent, args, { Topic }, info){
    let topics = await Topic.find().sort({ score: "descending" })

    let groups = []
    for(let i = 0; i < topics.length; i++){
      if(!groups.includes(topics[i].category)) groups.push(topics[i].category)
    }

    groups = groups.sort(async (a, b) => {
      let topic_a = await Topic.find({ category: a })
      let topic_b = await Topic.find({ category: b })
      return topic_b.length - topic_a.length
    })

    let pop_topics = []
    for(let i = 0; i < 3; i++){
      pop_topics.push({
        group: groups[i],
        items: (topics.filter(e => e.category === groups[i])).map(elem => elem.topic_name)
      })
    }

    return pop_topics
  },
  async get_popular_ideas(parent, args, { Idea }, info){
    let ideas = await Idea.find().sort({ score: "descending" })
    ideas = ideas.filter(idea => idea.published === true)
    return ideas.slice(0, 3)
  },
  async get_ideas_by_title(parent, args, { Idea }, info){
    let ideas = await Idea.find().sort({ score: "descending" })
    return ideas.filter(idea => (idea.title.toLowerCase().includes(args.str) && idea.published === true))
  },
  async get_idea_by_title(parent, args, { Idea }, info){
    let idea = await Idea.find({ title: args.title })
    return idea
  },
  async get_ideas_by_topic(parent, args, { Idea }, info){
    let ideas = await Idea.find().sort({ _id: 1 })
    return ideas.filter(idea => idea.topics.includes(args.topic))
  },
  async get_ideas_by_creator(parent, args, { Idea }, info){
    let ideas = await Idea.find({ creator: args.creator }).sort({ _id: 1 })
    return ideas
  },
  async get_ideas_by_acceptor(parent, args, { Idea }, info){
    let ideas = await Idea.find().sort({ _id: 1 })
    return ideas.filter(idea => idea.acceptors.includes(args.acceptor))
  },
  async get_idea_by_id(parent, args, { Idea }, info){
    let idea = await Idea.find({ _id: args.ideaId })
    return idea
  },
  async get_ideas_by_published(parent, args, { Idea }, info){
    let ideas = await Idea.find({ published: args.published }).sort({ _id: 1 })
    return ideas
  },
  async get_user_by_realname(parent, args, { User }, info){
    let user = await User.find({ "info.realname": args.realname })
    return user
  },
  async get_user_by_nickname(parent, args, { User }, info){
    let user = await User.find({ "info.nickname": args.nickname })
    return user
  },
  async get_user_by_id(parent, args, { User }, info){
    let user = await User.find({ _id: args.userId })
    return user
  },
  async get_user_by_email(parent, args, { User }, info){
    let user = await User.find({ "info.email": args.email })
    return user
  },
  async get_users_by_account_type(parent, args, { User }, info){
    let users = await User.find({ account_type: args.account_type }).sort({ _id: 1 })
    return users
  },
  async get_users_by_expertise(parent, args, { User }, info){
    let users = await User.find().sort({ _id: 1 })
    return users.filter(user => user.info.expertise.includes(args.expertise))
  },
  async get_users_by_login_state(parent, args, { User }, info){
    let users = await User.find({ login_state: args.login_state }).sort({ _id: 1 })
    return users
  },
  async get_user_ideas(parent, args, { User, Idea }, info){
    let user = await User.find({ _id: args.userId })
    let ideas = user[0].ideas.map(async ideaId => {
      let idea = await Idea.find({ _id: ideaId })
      return idea[0]
    })
    return ideas
  },
  async get_user_ongoing_projects(parent, args, { User, Idea }, info){
    let user = await User.find({ _id: args.userId })
    let ongoing_projects = user[0].ongoing_projects.map(async ideaId => {
      let idea = await Idea.find({ _id: ideaId })
      return idea[0]
    })
    return ongoing_projects
  },
  async get_user_ideas_to_be_reviewed(parent, args, { User, Idea }, info){
    let user = await User.find({ _id: args.userId })
    let ideas = user[0].ideas_to_be_reviewed.map(async ideaId => {
      let idea = await Idea.find({ _id: ideaId })
      return idea[0]
    })
    return ideas
  },
  async get_user_interested_topics(parent, args, { User, Topic }, info){
    let user = await User.find({ _id: args.userId })
    let interested_topics = user[0].interested_topics.map(async topic_name => {
      let topic = await Topic.find({ topic_name: topic_name })
      return topic[0]
    })
    return interested_topics
  },
  async check_device_login(parent, args, { User, Topic }, info){
    let user = await User.find({ "info.email": args.data.email })
    if(user.length > 0 && user[0].device_keys.includes(args.data.device_key)) return true
    else return false
  }
}

export { Query as default }