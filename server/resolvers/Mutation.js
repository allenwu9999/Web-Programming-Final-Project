import bcrypt from "bcrypt"
const saltRounds = 11

const Mutation = {
  async create_topic(parent, args, { Topic, pubsub }, info){
    await Topic.insertMany(args.data, (err, data) => {
      if(err) throw err
    })

    return args.data
  },
  async delete_topic(parent, args, { User, Idea, Topic, pubsub }, info){
    // todo: delete user expertise and idea topic
    if(!args.topic_name){
      let topics = await Topic.find()
      await Topic.deleteMany({})
      return topics
    }

    let topics = await Topic.find({ topic_name: args.topic_name })
    await Topic.deleteMany({ topic_name: args.topic_name })

    // let ideas = await Idea.find()
    // ideas.forEach(async idea => {
    //   let index = idea.topics.indexOf(args.topic_name)
    //   if(index !== -1){
    //     idea.topics.splice(index, 1)
    //     await Idea.updateMany({ _id: idea._id }, { topics: idea.topics })
    //   }
    // })

    // let users = await User.find()
    // users.forEach(async user => {
    //   let index1 = user.interested_topics.indexOf(args.topic_name)
    //   if(index1 !== -1){
    //     user.interested_topics.splice(index1, 1)
    //     await User.updateMany({ _id: user._id }, { interested_topics: user.interested_topics })
    //   }

    //   let index2 = user.info.expertise.indexOf(args.topic_name)
    //   if(index2 !== -1){
    //     user.info.expertise.splice(index2, 1)
    //     await User.updateMany({ _id: user._id }, { "info.expertise": user.info.expertise })
    //   }
    // })

    return topics
  },
  async update_topic_score(parent, args, { Topic, pubsub }, info){
    await Topic.updateMany({ topic_name: args.data.topic_name }, { score: args.data.score })
    let topic = await Topic.find({ topic_name: args.data.topic_name })
    return topic[0]
  },
  async add_topic_score_by_one(parent, args, { Topic, pubsub }, info){
    let topic = await Topic.find({ topic_name: args.topic_name })
    topic[0].score += 1
    await Topic.updateMany({ topic_name: topic[0].topic_name }, { score: topic[0].score })
    return topic[0]
  },
  // async add_topic_reviewers(parent, args, { Topic, pubsub }, info){
  //   let topic = await Topic.find({ topic_name: args.data.topic_name })
  //   topic[0].reviewers.push(args.data.reviewer)
  //   await Topic.updateMany({ topic_name: topic[0].topic_name }, { reviewers: topic[0].reviewers })
  //   return topic[0]
  // },
  // async remove_topic_reviewers(parent, args, { Topic, pubsub }, info){
  //   let topic = await Topic.find({ topic_name: args.data.topic_name })
  //   let index = topic[0].reviewers.indexOf(args.data.reviewer)
  //   if(index !== -1){
  //     topic[0].reviewers.splice(index, 1)
  //     await Topic.updateMany({ topic_name: topic[0].topic_name }, { reviewers: topic[0].reviewers })
  //   }
  //   return topic[0]
  // },
  async create_idea(parent, args, { User, Idea, Topic, pubsub }, info){
    let ideas = await Idea.find({ title: args.data.title })
    if(ideas.length > 0){
      throw new Error("Title already exists!!!")
    }

    let reviewers = []
    for(let i = 0; i < args.data.topics.length; i++){
      let topic_name = args.data.topics[i]
      let topic = await Topic.find({ topic_name: topic_name })
      reviewers = reviewers.concat(topic[0].reviewers)
    }
    reviewers = reviewers.filter((value, index, self) => (self.indexOf(value) === index && value !== args.data.creator))
    args.data.num_reviewers = reviewers.length

    let date = new Date()
    date.setMinutes(date.getMinutes() + 5)
    let timestamp = date.getFullYear().toString()
    timestamp += (date.getMonth()+1).toString().padStart(2, '0')
    timestamp += date.getDate().toString().padStart(2, '0')
    timestamp += date.getHours().toString().padStart(2, '0')
    timestamp += date.getMinutes().toString().padStart(2, '0')
    timestamp += date.getSeconds().toString().padStart(2, '0')
    args.data.expire_time = timestamp

    await Idea.insertMany(args.data)

    let idea = await Idea.find({ title: args.data.title })
    let id = idea[0].creator.split("@")[1]
    let creator = await User.find({ _id: id })
    creator[0].ideas.push(idea[0]._id)
    await User.updateMany({ _id: creator[0]._id }, { ideas: creator[0].ideas })

    idea[0].topics.forEach(async topic_name => {
      let topic = await Topic.find({ topic_name: topic_name })
      topic[0].reviewers.forEach(async name => {
        let user_id = name.split("@")[1]
        let user = await User.find({ _id: user_id })
        if(user[0].account_type !== 2 && !user[0].ideas_to_be_reviewed.includes(idea[0]._id) && (user_id !== idea[0].creator.split("@")[1])){
          user[0].ideas_to_be_reviewed.push(idea[0]._id)
          await User.updateMany({ _id: user_id }, { ideas_to_be_reviewed: user[0].ideas_to_be_reviewed })
        }
      })
    })

    setTimeout(async () => {
      let x = await Idea.find({ _id: idea[0]._id })
      if(x[0].review_acceptors.length + x[0].review_rejectors.length >= ((x[0].num_reviewers % 2) ? (x[0].num_reviewers / 2 + 1) : (x[0].num_reviewers / 2))){
        if(x[0].review_acceptors.length >= x[0].review_rejectors){
          await Idea.updateMany({ _id: x[0]._id }, { reviewed: true, published: true })

          // console.log(x[0].creator.split("@")[1])
          // console.log("###")
          // console.log(pubsub)
          pubsub.publish('review', {
            review: {
              mutation: 'REVIEW',
              creator_id: x[0].creator.split("@")[1],
              review_result: true
            }
          })
        }
        else{
          await Idea.updateMany({ _id: x[0]._id}, { reviewed: true, published: false })

          pubsub.publish('review', {
            review: {
              mutation: 'REVIEW',
              creator_id: x[0].creator.split("@")[1],
              review_result: false
            }
          })
        }
      }
      else{
        await Idea.updateMany({ _id: x[0]._id }, { reviewed: true, published: false })

        pubsub.publish('review', {
          review: {
            mutation: 'REVIEW',
            creator_id: x[0].creator.split("@")[1],
            review_result: false
          }
        })
      }
    }, 300000)

    return idea[0]
  },
  async delete_idea_by_id(parent, args, { User, Idea, Topic, pubsub }, info){
    let idea = await Idea.find({ _id: args.ideaId })
    await Idea.deleteMany({ _id: args.ideaId })

    let creator_id = idea[0].creator.split("@")[1]
    let user_creator = await User.find({ _id: creator_id })
    let index1 = user_creator[0].ideas.indexOf(args.ideaId)
    if(index1 !== -1){
      user_creator[0].ideas.splice(index1, 1)
      await User.updateMany({ _id: user_creator[0]._id }, { ideas: user_creator[0].ideas })
    }

    idea[0].acceptors.forEach(async acceptor_name => {
      let acceptor_id = acceptor_name.split("@")[1]
      let user_acceptor = await User.find({ _id: acceptor_id })
      let index2 = user_acceptor[0].ongoing_projects.indexOf(args.ideaId)
      if(index2 !== -1){
        user_acceptor[0].ongoing_projects.splice(index2, 1)
        await User.updateMany({ _id: user_acceptor[0]._id }, { ongoing_projects: user_acceptor[0].ongoing_projects })
      }
    })

    idea[0].topics.forEach(async topic_name => {
      let topic = await Topic.find({ topic_name: topic_name })
      topic[0].reviewers.forEach(async name => {
        let user_id = name.split("@")[1]
        let user = await User.find({ _id: user_id })
        
        let index3 = user[0].ideas_to_be_reviewed.indexOf(args.ideaId)
        if(index3 !== -1){
          user[0].ideas_to_be_reviewed.splice(index3, 1)
          await User.updateMany({ _id: user[0]._id }, { ideas_to_be_reviewed: user[0].ideas_to_be_reviewed })
        }

        let index4 = user[0].ideas_agreed.indexOf(args.ideaId)
        if(index4 !== -1){
          user[0].ideas_agreed.splice(index4, 1)
          await User.updateMany({ _id: user[0]._id }, { ideas_agreed: user[0].ideas_agreed })
        }

        let index5 = user[0].ideas_rejected.indexOf(args.ideaId)
        if(index5 !== -1){
          user[0].ideas_rejected.splice(index5, 1)
          await User.updateMany({ _id: user[0]._id }, { ideas_rejected: user[0].ideas_rejected })
        }
      })
    })

    return idea[0]
  },
  async update_idea_title(parent, args, { Idea, pubsub }, info){
    await Idea.updateMany({ _id: args.data.ideaId }, { title: args.data.title })
    let idea = await Idea.find({ _id: args.data.ideaId })
    return idea[0]
  },
  async update_idea_content(parent, args, { Idea, pubsub }, info){
    await Idea.updateMany({ _id: args.data.ideaId }, { content: args.data.content })
    let idea = await Idea.find({ _id: args.data.ideaId })
    return idea[0]
  },
  async add_idea_score_by_one(parent, args, { Idea, pubsub }, info){
    let idea = await Idea.find({ _id: args.ideaId })
    idea[0].score += 1
    await Idea.updateMany({ _id: idea[0]._id }, { score: idea[0].score })
    return idea[0]
  },
  async add_idea_acceptor(parent, args, { User, Idea, pubsub }, info){
    let idea = await Idea.find({ _id: args.data.ideaId })
    if(idea[0].published === true && !idea[0].acceptors.includes(args.data.acceptor)){
      idea[0].acceptors.push(args.data.acceptor)
      await Idea.updateMany({ _id: args.data.ideaId }, { acceptors: idea[0].acceptors })

      let userId = args.data.acceptor.split("@")[1]
      let user = await User.find({ _id: userId })
      if(!user[0].ongoing_projects.includes(args.data.ideaId)){
        user[0].ongoing_projects.push(args.data.ideaId)
        await User.updateMany({ _id: user[0]._id }, { ongoing_projects: user[0].ongoing_projects })
      }

      pubsub.publish('add_acceptor', {
        add_acceptor: {
          mutation: 'ADD_ACCEPTOR',
          creator_id: idea[0].creator.split("@")[1],
          acceptor_id: userId
        }
      })
    }

    return idea[0]
  },
  async remove_idea_acceptor(parent, args, { User, Idea, pubsub }, info){
    let idea = await Idea.find({ _id: args.data.ideaId })
    if(idea[0].published === false) return idea[0]

    let index = idea[0].acceptors.indexOf(args.data.acceptor)
    if(index !== -1){
      idea[0].acceptors.splice(index, 1)
      await Idea.updateMany({ _id: args.data.ideaId }, { acceptors: idea[0].acceptors })

      let userId = args.data.acceptor.split("@")[1]
      let user = await User.find({ _id: userId })
      let index2 = user[0].ongoing_projects.indexOf(args.data.ideaId)
      if(index2 !== -1){
        user[0].ongoing_projects.splice(index2, 1)
        await User.updateMany({ _id: user[0]._id }, { ongoing_projects: user[0].ongoing_projects })
      }

      pubsub.publish('remove_acceptor', {
        remove_acceptor: {
          mutation: 'REMOVE_ACCEPTOR',
          creator_id: idea[0].creator.split("@")[1],
          acceptor_id: userId
        }
      })
    }
    
    return idea[0]
  },
  async add_idea_review_acceptor(parent, args, { User, Idea, Topic, pubsub }, info){
    let idea = await Idea.find({ _id: args.data.ideaId })
    let id = args.data.review_acceptor.split("@")[1]
    let user = await User.find({ _id: id })

    let index1_1 = user[0].ideas_agreed.indexOf(args.data.ideaId)
    let index1_2 = user[0].ideas_rejected.indexOf(args.data.ideaId)
    if(index1_2 !== -1){
      if(!idea[0].review_acceptors.includes(args.data.review_acceptor)){
        idea[0].review_acceptors.push(args.data.review_acceptor)
        await Idea.updateMany({ _id: args.data.ideaId }, { review_acceptors: idea[0].review_acceptors })

        let index2 = idea[0].review_rejectors.indexOf(args.data.review_acceptor)
        if(index2 !== -1){
          idea[0].review_rejectors.splice(index2, 1)
          await Idea.updateMany({ _id: args.data.ideaId }, { review_rejectors: idea[0].review_rejectors })
        }
      }
    }
    else if(index1_1 === -1 && index1_2 === -1){
      if(!idea[0].review_acceptors.includes(args.data.review_acceptor)){
        idea[0].review_acceptors.push(args.data.review_acceptor)
        await Idea.updateMany({ _id: args.data.ideaId }, { review_acceptors: idea[0].review_acceptors })

        let index3 = user[0].ideas_to_be_reviewed.indexOf(args.data.ideaId)
        if(index3 !== -1){
          user[0].ideas_to_be_reviewed.splice(index3, 1)
          user[0].ideas_agreed.push(args.data.ideaId)
          await User.updateMany({ _id: user[0]._id }, { ideas_to_be_reviewed: user[0].ideas_to_be_reviewed, ideas_agreed: user[0].ideas_agreed })
        }
      }
    }

    idea = await Idea.find({ _id: args.data.ideaId })
    return idea[0]
  },
  async add_idea_review_rejector(parent, args, { User, Idea, Topic, pubsub }, info){
    let idea = await Idea.find({ _id: args.data.ideaId })
    let id = args.data.review_rejector.split("@")[1]
    let user = await User.find({ _id: id })

    let index1_1 = user[0].ideas_agreed.indexOf(args.data.ideaId)
    let index1_2 = user[0].ideas_rejected.indexOf(args.data.ideaId)
    if(index1_1 !== -1){
      if(!idea[0].review_rejectors.includes(args.data.review_rejector)){
        idea[0].review_rejectors.push(args.data.review_rejector)
        await Idea.updateMany({ _id: args.data.ideaId }, { review_rejectors: idea[0].review_rejectors })

        let index2 = idea[0].review_acceptors.indexOf(args.data.review_rejector)
        if(index2 !== -1){
          idea[0].review_acceptors.splice(index2, 1)
          await Idea.updateMany({ _id: args.data.ideaId }, { review_acceptors: idea[0].review_acceptors })
        }
      }
    }
    else if(index1_1 === -1 && index1_2 === -1){
      if(!idea[0].review_rejectors.includes(args.data.review_rejector)){
        idea[0].review_rejectors.push(args.data.review_rejector)
        await Idea.updateMany({ _id: args.data.ideaId }, { review_rejectors: idea[0].review_rejectors })

        let index3 = user[0].ideas_to_be_reviewed.indexOf(args.data.ideaId)
        if(index3 !== -1){
          user[0].ideas_to_be_reviewed.splice(index3, 1)
          user[0].ideas_rejected.push(args.data.ideaId)
          await User.updateMany({ _id: user[0]._id }, { ideas_to_be_reviewed: user[0].ideas_to_be_reviewed, ideas_rejected: user[0].ideas_rejected })
        }
      }
    }
    
    idea = await Idea.find({ _id: args.data.ideaId })
    return idea[0]
  },
  async remove_idea_review(parent, args, { User, Idea, Topic, pubsub }, info){
    let idea = await Idea.find({ _id: args.data.ideaId })

    let index1 = idea[0].review_acceptors.indexOf(args.data.username)
    if(index1 !== -1){
      idea[0].review_acceptors.splice(index1, 1)
      await Idea.updateMany({ _id: args.data.ideaId }, { review_acceptors: idea[0].review_acceptors })
    }

    let index2 = idea[0].review_rejectors.indexOf(args.data.username)
    if(index2 !== -1){
      idea[0].review_rejectors.splice(index2, 1)
      await Idea.updateMany({ _id: args.data.ideaId }, { review_rejectors: idea[0].review_rejectors })
    }

    let id = args.data.username.split("@")[1]
    let user = await User.find({ _id: id })

    let index3 = user[0].ideas_agreed.indexOf(args.data.ideaId)
    if(index3 !== -1){
      user[0].ideas_agreed.splice(index3, 1)
      if(!user[0].ideas_to_be_reviewed.includes(args.data.ideaId)) user[0].ideas_to_be_reviewed.push(args.data.ideaId)
      await User.updateMany({ _id: user[0]._id }, { ideas_to_be_reviewed: user[0].ideas_to_be_reviewed, ideas_agreed: user[0].ideas_agreed })
    }

    let index4 = user[0].ideas_rejected.indexOf(args.data.ideaId)
    if(index4 !== -1){
      user[0].ideas_rejected.splice(index4, 1)
      if(!user[0].ideas_to_be_reviewed.includes(args.data.ideaId)) user[0].ideas_to_be_reviewed.push(args.data.ideaId)
      await User.updateMany({ _id: user[0]._id }, { ideas_to_be_reviewed: user[0].ideas_to_be_reviewed, ideas_rejected: user[0].ideas_rejected })
    }

    idea = await Idea.find({ _id: args.data.ideaId })
    return idea[0]
  },
  async create_user(parent, args, { User, Topic, pubsub }, info){
    let users = await User.find({ "info.email": args.data.info.email })
    // console.log("users")
    // console.log(users)
    if(users.length > 0){
      throw new Error("Email already exists!!!")
    }

    const hash = await bcrypt.hash(args.data.info.password_hashed, saltRounds)
    args.data.info.password_hashed = hash

    await User.insertMany(args.data)

    let user = await User.find({ "info.realname": args.data.info.realname })
    let name = user[0].info.nickname + "@" + user[0]._id
    user[0].info.expertise.forEach(async expertise => {
      let topic = await Topic.find({ topic_name: expertise })
      topic[0].reviewers.push(name)
      await Topic.updateMany({ topic_name: topic[0].topic_name }, { reviewers: topic[0].reviewers })
    })

    return user[0]
  },
  async delete_user_by_id(parent, args, { User, Idea, Topic, pubsub }, info){
    let user = await User.find({ _id: args.userId })
    await User.deleteMany({ _id: args.userId })

    let name = user[0].info.nickname + "@" + user[0]._id

    user[0].ongoing_projects.forEach(async ideaId => {
      let idea = await Idea.find({ _id: ideaId })
      let index1 = idea[0].acceptors.indexOf(name)
      if(index1 !== -1){
        idea[0].acceptors.splice(index1, 1)
        await Idea.updateMany({ _id: ideaId }, { acceptors: idea[0].acceptors })
      }
    })

    user[0].info.expertise.forEach(async topic_name => {
      let topic = await Topic.find({ topic_name: topic_name })
      let index2 = topic[0].reviewers.indexOf(name)
      if(index2 !== -1){
        topic[0].reviewers.splice(index2, 1)
        await Topic.updateMany({ _id: topic[0]._id }, { reviewers: topic[0].reviewers })
      }
    })

    return user[0]
  },
  async update_user_account_type(parent, args, { User, pubsub }, info){
    await User.updateMany({ _id: args.data.userId }, { account_type: args.data.account_type })
    let user = await User.find({ _id: args.data.userId })
    return user[0]
  },
  async update_user_password_hashed(parent, args, { User, pubsub }, info){
    const hash = await bcrypt.hash(args.data.password_hashed, saltRounds)
    await User.updateMany({ _id: args.data.userId }, { "info.password_hashed": hash })
    let user = await User.find({ _id: args.data.userId })
    return user[0]
  },
  async update_user_email(parent, args, { User, pubsub }, info){
    await User.updateMany({ _id: args.data.userId }, { "info.email": args.data.email })
    let user = await User.find({ _id: args.data.userId })
    return user[0]
  },
  async update_user_avatar(parent, args, { User, pubsub }, info){
    await User.updateMany({ _id: args.data.userId }, { "info.avatar_content": args.data.avatar_content, "info.avatar_color": args.data.avatar_color })
    let user = await User.find({ _id: args.data.userId })
    return user[0]
  },
  async update_user_region(parent, args, { User, pubsub }, info){
    await User.updateMany({ _id: args.data.userId }, { "info.region": args.data.region })
    let user = await User.find({ _id: args.data.userId })
    return user[0]
  },
  async add_user_expertise(parent, args, { User, Topic, pubsub }, info){
    let user = await User.find({ _id: args.data.userId })
    if(!user[0].info.expertise.includes(args.data.expertise)){
      user[0].info.expertise.push(args.data.expertise)
      await User.updateMany({ _id: args.data.userId }, { "info.expertise": user[0].info.expertise })

      let topic = await Topic.find({ topic_name: args.data.expertise })
      let name = user[0].info.nickname + "@" + user[0]._id
      topic[0].reviewers.push(name)
      await Topic.updateMany({ _id: topic[0]._id }, { reviewers: topic[0].reviewers })
    }
    return user[0]
  },
  async remove_user_expertise(parent, args, { User, Topic, pubsub }, info){
    let user = await User.find({ _id: args.data.userId })
    let index1 = user[0].info.expertise.indexOf(args.data.expertise)
    if(index1 !== -1){
      user[0].info.expertise.splice(index1, 1)
      await User.updateMany({ _id: args.data.userId }, { "info.expertise": user[0].info.expertise })

      let topic = await Topic.find({ topic_name: args.data.expertise })
      let name = user[0].info.nickname + "@" + user[0]._id
      let index2 = topic[0].reviewers.indexOf(name)
      if(index2 !== -1){
        topic[0].reviewers.splice(index2, 1)
        await Topic.updateMany({ _id: topic[0]._id }, { reviewers: topic[0].reviewers })
      }
    }
    return user[0]
  },
  async user_login(parent, args, { User, pubsub }, info){
    // console.log(args.data)
    let user = await User.find({ "info.email": args.data.email })
    // console.log(user)
    const res = await bcrypt.compare(args.data.password_hashed, user[0].info.password_hashed)
    if(!(user.length > 0) || !res) return false

    // console.log("hello")

    // user[0].login_state = !user[0].login_state
    await User.updateMany({ _id: user[0]._id },
      {
        login_state: true,
        device_keys: [...user[0].device_keys, args.data.uuid]
      })
    console.log("login successful", args.data.uuid)
    return true
  },
  async user_logout(parent, args, { User, pubsub }, info){
    // console.log("hi")
    // console.log(args.data)
    let user = await User.find({ "info.email": args.email })
    // console.log(user)
    if(!(user.length > 0)) return false

    // console.log("hello")

    // user[0].login_state = !user[0].login_state
    await User.updateMany({ _id: user[0]._id }, { login_state: false })
    return true
  },
  async add_user_interested_topic(parent, args, { User, pubsub }, info){
    let user = await User.find({ _id: args.data.userId })
    if(!user[0].interested_topics.includes(args.data.interested_topic)){
      user[0].interested_topics.push(args.data.interested_topic)
      await User.updateMany({ _id: args.data.userId }, { interested_topics: user[0].interested_topics })
    }
    return user[0]
  },
  async remove_user_interested_topic(parent, args, { User, pubsub }, info){
    let user = await User.find({ _id: args.data.userId })
    let index = user[0].interested_topics.indexOf(args.data.interested_topic)
    if(index !== -1){
      user[0].interested_topics.splice(index, 1)
      await User.updateMany({ _id: args.data.userId }, { interested_topics: user[0].interested_topics })
    }
    return user[0]
  },
  async add_user_device_key(parent, args, { User, pubsub }, info){
    let user = await User.find({ _id: args.data.userId })
    if(!user[0].device_keys.includes(args.data.device_key)){
      user[0].device_keys.push(args.data.device_key)
      await User.updateMany({ _id: args.data.userId }, { device_keys: user[0].device_keys })
    }
    return user[0]
  },
  async remove_user_device_key(parent, args, { User, pubsub }, info){
    let user = await User.find({ _id: args.data.userId })
    let index = user[0].device_keys.indexOf(args.data.device_key)
    if(index !== -1){
      user[0].device_keys.splice(index, 1)
      await User.updateMany({ _id: args.data.userId }, { device_keys: user[0].device_keys })
    }
    return user[0]
  },
  // async add_user_ongoing_project(parent, args, { User, pubsub }, info){
  //   let user = await User.find({ _id: args.data.userId })
  //   if(!user[0].ongoing_projects.includes(args.data.ongoing_project)){
  //     user[0].ongoing_projects.push(args.data.ongoing_project)
  //     await User.updateMany({ _id: args.data.userId }, { ongoing_projects: user[0].ongoing_projects })
  //   }
  //   return user[0]
  // },
  // async remove_user_ongoing_project(parent, args, { User, Topic, pubsub }, info){
  //   let user = await User.find({ _id: args.data.userId })
  //   let index = user[0].ongoing_projects.indexOf(args.data.ongoing_project)
  //   if(index !== -1){
  //     user[0].ongoing_projects.splice(index, 1)
  //     await User.updateMany({ _id: args.data.userId }, { ongoing_projects: user[0].ongoing_projects })
  //   }
  //   return user[0]
  // }
}

export { Mutation as default }
