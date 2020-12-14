# Web Programming Final Project
---
## structure
### mainpage:
- sign in / sign up
- title toolbar
- cover
    - title
    - sub
    - start now [button]
- usage, helpful messages
- popular catgories / topics
- footer: license, copyright

### accouts:
- admins: all
- reviewers: review, upload, accept
- normal users: upload, accept 

## page design
### sign in
- id [input type="text"]
    - problem: can we merge id as email?
- pwd [input type="text"]
- sign in [button]
- create account [button]
    - problem: button or a/href?
- forget password [button]
    - problem: button or a/href?
- keyboard inputs:
    - id tab -> pwd
    - pwd tab -> sign in focus
    - enter -> sign in

### sign up
- realname [input type="text"]
- nickname [input type="text"]
- id [input type="text"]
- email [input type="text"]
- pwd [input type="text"]
- pwd check [input type="text"]
- account type [button type="radio"]
    - reviewers [button]
        - note: reviewers need certificates
    - normal user [button]
- sign up [button]
- already had an account? [a/href]

### Topic(after sign in)
- toolbar
    - logo
    - topics
    - upload ideas
    - search bar
    - message / notifications
    - account
- fav topics
- recommended topics
- popular topics
- all topics

### Topic(before sign in)
- toolbar
    - logo
    - search
    - sign button
    - tags
- tag1
    - cover
    - intro
- tag2
    - cover
    - intro

### Account Button on Toolbars (after sign in)
- Avatar
    - problem: avatars?
        1. No avatar
        2. Selectable
        3. Imgur as DB
- id [pure text]
    - problem: or nickname?
- settings
    - same as sign up page
    - **real name, id can not change**
    - **add old pwd, new pwd, confirm new pwd**
- my ideas
- interested topics / my topics
    - favorites [list] (with an add button)
    - recent views
        - every line with an add button
        - add to favorites
    - expertise [list] (with an add button)
- projects ongoing
- my reviews (reviewers only)

### upload ideas
- name
- tag
- plan
- review method [radio button]
- resources already had [optional]
- resources needed [optional]
- reference [optional]
- expect time and money [optional]
- upload project file [button] [optional]

---

## programming structure

### base
- baseURL

### "css template"
- including toolbar and footer
- middle is empty: add things in

### mainpage
- baseURL
- sign in or not: using cookies
- sign in: baseURL/signin
- sign up: baseURL/signup
- start now -> baseURL/signup

### signin
- baseURL/signin
- clicking button "sign in":
    - client send:
    ```javascript
    {
        method: POST,
        URL: baseURL/signin,
        data: {
            id: id,
            pwd: hash(pwd)
        },
        cookie: cookie
    }
    ```
    - server return:
    ```javascript
    if data in DB:
        return {
            cookie: <add some info, help>
            redirecting to mainpage
        }
    else:
        show "invalid id / pwd" underneath the login block
    ```
    - [bcrypt](https://github.com/kelektiv/node.bcrypt.js) to [encode pwd](https://ithelp.ithome.com.tw/articles/10196477)
- clicking button "create account":
    - redirecting: baseURL/signup
- clicking button "forget password?":
    - redirecting: baseURL/forgetpwd

### signup
- baseURL/signup
- clicking button "sign up":
    - remember to check if pwd is strong enough
    - client send:
    ```javascript
    {
        method: POST,
        URL: baseURL/signup,
        data: {
            realname: realname,
            nickname: nickname,
            id: id,
            email: email(?),
            pwd: hash(pwd),
            account_type: account_type
        },
        cookie: cookie
    }
    ```
    - server return:
    ```javascript
    if data in DB:
        return {
            cookie: <add some info, help>
            redirecting to mainpage
        }
    else:
        show "invalid id / pwd" underneath the login block
    ```
    - [cookie with pureJS](https://www.fooish.com/javascript/cookie.html)
    - [js-cookie module](https://github.com/js-cookie/js-cookie)

## nice ref
- https://ithelp.ithome.com.tw/users/20107247/ironman/1312
- do we need joi to certificate post?
- do we need jwt(API Token) ?
- do we need mocha to test?
- ngrok: tmp deploy
- do we need forever to stay server up?
---
## Database
### User
* accout type(int)
* info(json)
    * real name(str)
    * nickname(str)
    * id(str)
    * pwd(str)
    * email(str)
    * avatar(imgur http)
    * region(str)
    * expertise(str)
* login state
* ideas
* interested topics
* ongoing projects
* ideas to be reviewed

### Ideas
* topics
* subtopics
* content
* creater
    * nickname@id
* accepters
    * nickname@id
* tags
* idea id(auto)

### Topics
* popular topics
* suptopic
    * topic
    * score

### Projects(optional)

###### tags: `Ideas Republica`, `Web Programming 2020`