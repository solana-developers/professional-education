# Solana Professional Education

This repo is the Solana Professional Education training. It's designed for those thinking about running an event and/or instructing the course.

The training covers cryptography fundamentals, blockchain, and Solana from the ground up, with frequent hands-on labs. By the end of the training, students will be able to create and transfer tokens, mint NFTs, and build simple on-chain applications using Anchor on Rust.

**If you just want to learn Solana**, follow [@solana_devs on X](https://x.com/solana_devs) and we'll let you know when the next course is running in a city near you!

**If you're planning on running a training event** welcome, you're in the right place! This repo has everything you need to plan and teach the course. You can also [contact Mike MacCana](mailto:mike.maccana@solana.org) for help.

- The [Instructor presentation](./Solana%20Professional%20Education.key). We use Keynote as there are animations in some slides, and other presentation tools don't have Keynote's 'magic move'. There is also a [Powerpoint Export](./Solana%20Professional%20Education%20Powerpoint%20Export.pptx)
- The files in [`labs`](./labs) are working solutions to each lesson's labs.
- This README file is a playbook of how to run a training event.

[Aims of the training](#aims-of-the-training)

[Training Offering:](#training-offering)

[Agenda](#agenda)

[Event planning playbook](#event-planning-playbook)

## Aims of the training

### Applicable to the widest group of potential Solana developers.

The training requirements are simple: any developer with TypeScript experience. Specifically, no cryptography, blockchain, or Rust experience is required. TypeScript is chosen because it's the language of the JS/TS SDKs, and additionally because understanding strictly typed languages is considered necessary to learn Rust.

**The course is not a beginner course**. Just because the course has low prerequisities does not mean the course is only for beginners. Students will write Anchor / Rust code from scratch, and deploy that code to Solana devnet as part of the course.

### Low time to hello world

People have a limited amount of attention and learning should be focused on the requirements for next task. Anything that isn't relevant to their next task should be removed. If the next task is sending tokens, and JSON RPC knowledge isn't required to perform this task (which it isn't) remove the JSON RPC content.

### Do real things on a real network

We don't need to discuss the benefits of Solana. If a student is attending the course they likely already know that Solana is fast and cheap and has a huge amount of developer and financial activity. We can show the benefits of Solana, live on devnet.

### Students must be able to stand on their own two feet after training is over.

This means students make new projects from scratch, rather than clone existing repos. It also means using the student's own computers rather than sandbox applications like Solana Playground.

### Smaller steps

Student drop-off - which has been high even in some of the best-regarded ecosystem training - often happens when the class moves faster than individual students and the students become so far behind the rest of the group they can't keep up. Smaller steps allow the class to proceed as a group, allow the group to discuss each step in detail, and increase the chances of everyone getting through every exercise.

### Focus on Solana

Many existing Solana courses are slowed down by issues that have nothing to do with Solana. This is not a course in JavaScript frameworks, IIFEs (`;(async function(){})();`), or any other topic.

## Training Offering

**3 days **full-time** in-classroom**, or **10 x 2-hour remote lessons**. We will likely expand this to four 4 days / 13 lessons in the future.

**Audience**: aimed at anyone proficient in Typescript, that wants to learn blockchain.

The aim is to focus on the wider audience of people who want/need to build things, rather than blockchain enthusiasts or Rust programmers. Hence blockchain or cryptography knowledge is not required.

**Student time** is 10 AM to 4 PM.

**Instructor time** is 9 AM to 5 PM.

**Class sizes**: generally between 10 and 15 people - you want to spend time with every student, and larger class sizes get difficult to manage for a single instructor.

**Lead time**: 1-month minimum, ideally six weeks

**Roles**:

​ 1 x Instructor and event-responsible individual

​ 1 x Onsite coordinator (student wrangling, catering, building access, equipment installation)

​ 1 x Marketing (promotion to external teams)

## Agenda

There are two variants, classroom-based and remote

### Remote training

Each day session is about 2 hours - this is a rough estimate based on previous training sessions and changes may apply.

#### Day 1

Lesson 1: Introduction to Cryptography

Lab 1: Loading and saving keypairs

#### Day 2

Lesson 2: Read data from the network

Lab 2: Using Solana Devnet

#### Day 3

Lesson 3: Run transactions
Lab 3: Transactions and Sending SOL

#### Day 4

Lesson 4: Make and transfer tokens

Lab 4: Making a token mint, and using it to mint tokens

#### Day 5

Lesson 5: Using Metaplex

Lab 5: Create Token Metadata

#### Day 6

Lesson 6: Introduction to Anchor

#### Day 7

Lab 6: Onchain programming (first part, anchor setup of a blank project)

#### Day 8

Lab 6: Onchain programming (creating the favourites program)

#### Day 9

Onchain programming (writing tests and deploying the favourites program)

### Classroom-based training

The below is based on 6-hour student days.

#### Day 1

**Lesson 1**: Intro to Cryptography

**Lab 1**: Loading and saving keypairs

**Lesson 2**: Read data from the network

**Lab 2**: Using Solana Devnet

**Lesson 3**: Run Transactions

**Lab 3**: Transactions and Sending SOL

#### Day 2

**Lesson 4**: The Token Program

**Lab 4**: Making a token mint, and using it to mint tokens

**Lesson 5**: Using Metaplex

**Lab 5**: Create Token Metadata

#### Day 3

**Lesson 6**: Introduction to Anchor

**Lab 6**: Onchain programming

## Event planning playbook

### Beginning of lead time (see above)

#### Have secured budget

None of this goes ahead unless there’s a budget

​ Costs will be equipment, event space, catering, and merch, see below.

#### Have secured date, venue

The venue needs to be quiet (ie not in the middle of a loud event like a Hacker House)

Confirm seating arrangements:

- Desks and chairs facing the instructor
  1 x 90-inch monitor/TVs (one closer to back) as projector equivalents.
- Actual projectors are generally preferable to monitors as the text size is larger.

#### Luma page up

Create the Luma page by following these steps:

##### Description

From a previous event, update accordingly based on your organization and location!

> ​​The Solana Foundation is inviting developers to a 4-day Solana professional training session.

> The training covers cryptography fundamentals, blockchain, and Solana from the ground up, with frequent hands-on labs. By the end of the bootcamp, attendees will be able to create and transfer tokens, mint NFTs, and build on-chain applications on Solana, the fastest, cheapest, and most scalable blockchain.
>
> The training is aimed at any existing web developer. You'll need to know TypeScript, but you don't need prior cryptography or blockchain experience.
>
> This training is free of charge.
>
> Lunch is provided daily.
>
> Requirements:
>
> - Proficient in TypeScript
> - This is a hands on course, so you'll need a laptop. A Mac or Linux laptop, Windows is fine too but you must have WSL2 and Microsoft Terminal installed.

> We're expecting a large demand for this course, so we've added a few questions during registration. Registering does not guarantee acceptance into the training. If you're accepted we'll see you there!

See previous events: [May 28, 2023](https://lu.ma/850szocc), [Mar 25, 2023](https://lu.ma/ah0v9gwb)

#### Options

Tickets: free

Require Approval: yes

Capacity: 3x attendees (eg, if you want 15 people, limit the event to 45 people) due to flakiness

#### ⚠️ Before you publicize the event

**Note**: it will be too late to change these after you get sign-ups so please do all of these.

- In 'Overview', click 'Edit Event', scroll all the way down, and set 'Restrict Location to Guests' (this stops unregistered guests from showing up)
- Click 'Registration' and add a checkbox question:
  - 'I can commit to all 4 days of training, 10 AM to 4 PM'
  - 'I have a laptop running macOS, Linux, or Windows (Windows must have WSL2 and Microsoft Terminal)'
- Click 'More', 'Event page', and set a nice slug in the Public URL `solana-training-nyc-may-28-2024`. Note: you **must** do this before publicizing your event, as Luma will **not** redirect from the old URL to the new URL if you have it, which will break any links to the original URL.

#### Begin Promotion:

- X/Twitter
  - This should be an ongoing promotion, sent from your own account. Use emojis and get retweets from major ecosystem accounts
- Marketing will help

  - [Offline](https://twitter.com/getofflinexyz) (formerly Solana NYC Alliance)
  - [Solana U](https://www.solanau.org/)
  - [NY Tech Alliance](https://www.nytech.org/)
  - NY [Baddies in Tech](https://www.baddiesintech.com/)
  - NYU Computer Science
  - Other Blockchain groups
  - Local community groups

- Paid ads possibly, but we didn't last time.
  - A good strategy with paid engagement is to try a few organic posts and use paid engagement as a force multiplier for the posts that organically get popular. Eg, try five pieces of content, pick the one that performs the best after 24 hours, and put a budget behind it for paid engagement.
  - Target the geographic area for the class
  - Target accounts that follow general JS/TS developers, rather than accounts that follow blockchain accounts.

#### Equipment

Tables, chairs, and monitors/projectors:

Screens and keyboard/mice are not needed as students bring their laptops

Confirm room layout, eg:

2 developers fit on a standard (30x72) table. You can physically fit three, but it won't be comfortable. Use two.

```plaintext
Instructor + TV

[ table ]   [ table ]
[ table ]   [ table ]
[ table ]   [ table ]
```

### 2 weeks

#### Merch / Swag

Your contact at Solana Foundation may be able to organize items from https://store.solana.com/

### 1 week

#### Manual confirmation and setup reminder email

The purpose of this email is twofold:

- Confirm attendance - the people who reply to this email are your real attendees.
- Ensure nobody running Windows spends the first day configuring their laptops

Luma allows you to contact attendees, but we won’t use that for this email - you’ll get a better response rate with a **personal** email that doesn’t look like spam.

Send from personal account:

---

To: your email address

CC: **nobody** (important, don’t put anyone here as it will reveal ('dox') attendees to each other)

BCC: attendee list

Subject: Action Required: confirm attendance for Solana professional training [REPLACEME ADD DATES]

Body (modify accordingly):

We are pleased to inform you that you have been accepted into the Solana professional training event [REPLACEME ADD DATES]!

Here are the details:

⏰ When: [REPLACEME ADD DATES]

📍 Where: [REPLACEME ADD LOCATION AND A GOOGLE MAPS LINKS]

🤓 What: The training will cover the basics of cryptography, blockchain, and Solana from the ground up, with frequent hands-on labs. By the end of the training, you will be able to create and transfer tokens, mint NFTs, and build on-chain applications.

☝️ Requirements:

You’ll need to be proficient in TypeScript. For example, you should understand what Promise<Array<Item>> means.
You don't need to know Rust, and no previous experience in cryptography or blockchain is needed.

A laptop running macOS, Linux, or Windows.

 - Windows must have WSL2 and Microsoft Terminal installed and running before the event.
 - Please have nodejs 18 or 20 installed before the event
 - Also install Telegram messenger on your laptop - we’re going to be interacting with each other on devnet and be using this to send wallet addresses around!

🥗 Food: Lunch is provided daily. Coffee, drinks, and snacks are available.

🚨 ACTION: PLEASE RESPOND TO THIS EMAIL IF YOU PLAN ON ATTENDING🚨

We look forward to hearing from you and congratulations on your acceptance!

Thanks,

[REPLACEME ADD YOUR NORMAL EMAIL SIGNATURE]
---

### 3 or so days before

Collect the email addresses that replied to the ‘action required’ email and send them to your building security so attendees can access your building.

### Day before event

The day of the event it’s unlikely you will have time for room setup. Students will arrive before the event and want to talk to you.

9 AM: Room setup.

- Chairs
- Desks
- Power strips
- TV/projector
- Whiteboard, eraser, markers.

### Morning of event

- **You will have little or no time in the hour before the event.** Someone will inevitably arrive early. Don’t leave anything to the last minute if you can.
- Write the wifi name on the whiteboard - people will arrive late, let them know the Wifi password. Don’t use a slide for this, or you’ll forever be jumping back and forth to the slide with the WiFi details.
- As people arrive, greet them and let them know about Breakfast

### Delivering content remotely

big gestures
zoom,
not monotone, joke around

vary tempo

change tonality and tempo

### Training days

In order to put your Mac into a mode where:

- Keynote shows the current slide, plus instructor notes, and the next slide
- The TV shows the current slide

You need to set display settings on your Mac. **This is not as obvious as it sounds.**

- Pick the TV and set ‘Use As’ to ‘Stop Mirroring’. Yes that doesn’t make any grammatical sense.
- You can now extend the display onto the TV.

**![img](https://lh7-us.googleusercontent.com/-4LcqN--vBE1wOZIDjcEcx0y3z1eOgL0KvVWqPA4i_pbA-3qrhCor_JzhwyKQGWS6VpbJ91s2dyUw_or3NxMUfn6_Hkg7nzi9rRXIy4N3LY7USSfr1wR-Txvk4l7D2fg45gQJ8F8tGpgQzvbhKdQnw)**

Common causes of students having trouble with the labs:

- Students with an out-of-date node.js There’s a node version check in the slides for this reason. Anything less than node 18 was at the time of writing unsupported by node.js maintainers. Running an out-of-date version will give you errors about strange characters like (`||=`) when reading random files.
- Students inconsistently moving between spellings of ‘favorites’ / ‘favourites’ during the Anchor lab.
- Editors other than VScode are fine, but you can use your own VSCODE / Rust Analyzer setup to work out why the code doesn’t work
- If you’re stuck about why a student’s code doesn’t work you can also paste over the answer and look at the differences in your git client.
- If you don’t know the answer to a question, that’s OK, tell the student you’ll chase an answer, and ask your colleagues on Slack.

### Final day

Chase up any items the students have added to the’ to be addressed’ list

Ensure people know of:

- Solana Stack Exchange
- 'Program Examples' repo for Anchor

Essentially you want to make sure they're part of the wider Solana developer community and don't use the class Telegram for technical support!

**If people do ask technical questions on Telegram** direct them to Solana Stack Exchange.

Check for any lost property

Return extra merch/swag to the storage area.

### After the Event

- Check [survey results on the TypeForm](https://admin.typeform.com/form/IPH0UGz7/results#responses)
- Correct any bugs in the course material and or instructor notes

- Send a follow-up email, for example (modify as appropriate):

Send from personal account:

---

To: your email address

CC: **nobody** (important, don’t put anyone here as it will reveal ('dox') attendees to each other)

BCC: attendee list

Subject: Action Required: confirm attendance for Solana professional training next week

Body (modify accordingly):

---

Thanks for joining us at the first Solana Professional Developer Training! 🎉 I learned a lot and I hope you did, too. Here are a few resources to assist on your Solana journey:

🤓 Continue building with:

- [Solana Stack Exchange](https://www.web3builders.dev/) - Q and A. Search before posting!

- [Solana DevRel Program Examples](https://github.com/solana-developers/program-examples) - perpetually updated examples of Anchor Solana programs maintained by the Solana Foundation.

- [Web3 Builders [Alliance](https://www.web3builders.dev/) - multiple-week deep Solana development course. WBA graduates have built a lot of Hackathon winners and Solana ecosystem products.

- The [Rareskills EVM to SVM tutorial](https://www.rareskills.io/solana-tutorial) - recommended to folks coming from an EVM background

🗓️ Follow the [Solana Foundation Developer Events calendar](https://solana.com/events) for more opportunities to learn and connect with other developers.

🤝 Know any colleagues that need Solana training? Know any meetup groups in NYC that need Solana speakers? Let us know by replying to this email and we'll get in contact.

📱 Follow [@solana_devs on X](https://x.com/solana_devs) to stay updated with the latest information about the Solana ecosystem.

💼 Check out [Solana Jobs](https://jobs.solana.com/jobs) to get hired.

🏟️ Check out [Colosseum](https://www.colosseum.org/hackathon) to learn about upcoming Hackathons/

📫 If you have any feedback, you are always welcome to share it directly with me!

Cheers,

FILL_IN_YOUR_NAME

---
