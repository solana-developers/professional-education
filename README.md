# Solana Professional Education

This repo is the Solana Professional Education training. It's designed for instructors, or those thinking about running and event and/or instructing the course.

**If you just want to learn Solana**, follow [@solana_devs on X](https://x.com/solana_devs) and we'll let you know when the next course is running in a city near you!

**If you're planning on running a training event** welcome, you're in the right place! This reo has everything you need to plan and teach the course. You can also [contact Mike MacCana](mailto:mike.maccana@solana.org) for help.

- The [Instructor presentation](./Solana%20Professional%20Education.key). We use Keynote as there are animations in some slides.
- The files in [`labs`](./labs) are working solutions to each lesson's labs.
- This README file is a playbook of how to run a training event.

## Aims of the training

### Applicable to the widest group of potential Solana developers.

The training requirements are simple: any developer with TypeScript experience. Specifically, no cryptography, blockchain or Rust experience is required. TypeScript is chosen because it the language of the JS/TS SDKs, and additionally because understanding of strictly typed languages ass

### Low time to hello world

People have a limited amount of attention and learning should be focused on the requirements for next task. Anything that isn't relevant to their next task should be removed. If the next task is sending tokens, and JSON RPC knowledge isn't required to perform this task (which it isn't) remove the JSON RPC content.

### Do real things on a real network

We don't need to discuss the benefits of Solana. If a student is attending the course they likely already know that Solana is fast and cheap and has a huge amount of developer and financial activity. We can show the benefits of Solana, live on devnet.

### Students must be able to stand on their own two feet after training is over.

This means we make new projects from scratch, rather than clone existing repos.

### Smaller steps

Student drop off - which has been high even in some of the best regarded ecosystem training - often happens when the class moves faster than individual students and the students become so far behind the rest of the group it's impossible for them to keep up. Smaller steps allow the class to proceed as a group, allows the group to discuss each step in detail, and increases the chances of everyone gets through every exercise.

### Focus on Solana

Many existing Solana courses are slowed down by issues that have nothing to do with Solana. This is not a course in JavaScript frameworks, IIFEs (`;(async function(){})();`), or any other topic.

## Training Offering:

**18 hours** (3 days full time) in-classroom training. We will likely expand this in future.

**Audience**: aimed at anyone proficient in Typescript, that wants to learn blockchain.

The aim is to focus on the wider audience of people that want/need to build things, rather than blockchain enthusiasts or Rust programmers. Hence blockchain or cryptography knowledge is not required.

**Student time** is 10AM to 4PM

**Instructor time** is 9AM to 5PM

**Class sizes**: generally between 10 and 15 people - you want to spend time with every student, larger class sizes get difficult to manage for a single instructor.

**Lead time**: 1 month minimum, ideally six weeks

**Roles**:

​ 1 x Instructor and event responsible individual

​ 1 x Onsite coordinator (student wrangling, catering, building access, equipment installation)

​ 1 x Marketing (promotion to external teams)

# Agenda

The below is based on 6 hour days.

## Day 1:

Lesson 1: Intro to Cryptography
Lab 1: Loading and saving keypairs

Lesson 2: Read data from the network
Lab 2: Using Solana Devnet

Lesson 3: Run Transactions
Lab 3: Transactions and Sending SOL

## Day 2:

Lesson 4: The Token Program
Lab 4: Making a token mint, and using it to mint tokens

Lesson 5: Using Metaplex
Lab 5: Create Token Metadata

## Day 3:

Lesson 6: Introduction to Anchor
Lab 6: Onchain programming

# Event planning playbook

### Beginning of lead time (see above)

#### Have secured budget

None of this goes ahead unless there’s budget

​ Costs will be equipment, event space, catering and merch, see below.

#### Have secured date, venue

​ Venue needs to be quiet (ie not in the middle of a loud event like a Hacker House)

Confirm seating arrangements

Desks and chairs facing instructor

1 x 90 inch monitor/TVs (one closer to back) as instructor screens

Projectors are generally preferable to monitors as the text size is larger.

#### Luma page up

- See previous event https://lu.ma/ah0v9gwb
- Set Luma so only registered guests can see the precise location (this stops unregistered guests from showing up)
- Set limit to 3x attendees (eg, 45 people) due to flakiness

#### Begin Promotion:

- X/Twitter
  - This should be an ongoing promotion, sent from your own account. Use emojis and get retweets from major ecosystem accounts
- Marketing will help
  - [Offline](https://twitter.com/getofflinexyz)
  - NYU Computer Science
  - Solana NYC Alliance
  - [Solana U](https://www.solanau.org/)
  - [NY Tech Alliance](https://www.nytech.org/)
  - NY [Baddies in Tech](https://www.baddiesintech.com/)
  - Other Blockchain groups
  - Local community groups
- Paid ads possibly, but we didn't last time.
  - A good strategy with paid engagement is to try a few organic posts and use paid engagement as a force-multiplier for the posts that organically get popular. Eg, try five pieces of content, pick the one that performs the best after a 24 hours, and put a budget behind it for paid engagement.

#### Equipment

Tables, chairs, and monitors/projectors:

Screens and keyboard/mice are not needed as students bring their own laptops

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

- Confirm attendance - the people that reply to this email are your real attendees.
- Ensure nobody running Windows spends the first day configuring their laptops

Luma allows you to contact attendees, but we won’t use that for this email - you’ll get a better response rate with a **personal** email that doesn’t look like spam.

Send from personal account:

---

To: your email address

CC: **nobody** (important, don’t put anyone here as it will reveal ('dox') attendees to each other)

BCC: attendee list

Subject: Action Required: confirm attendance for Solana professional training next week

Body (modify accordingly):

We are pleased to inform you we have accepted you to the Solana professional training event in our offices next week!

Here are the details:

⏰ When: Monday March 25 - Wednesday March 27

📍 Where: (address including floor and any entrance instructions - and fix the google maps link!)

Google Maps link: [https://maps.google.com]

🤓 What: The training will cover the basics of cryptography, blockchain, and Solana from the ground up, with frequent hands-on labs. By the end of the boot camp, you will be able to create and transfer tokens, mint NFTs, and build on-chain applications.

☝️ Requirements:

- You’ll need to be proficient in TypeScript.

- A laptop running macOS, Linux, or Windows.

  - Windows must have WSL2 and Microsoft Terminal installed and running before the event.

- Please have nodejs 18 or 20 installed prior to the event

- FOR CLASSROOM TRAINING ONLY (ZOOM HAS ZOOM CHAT) Please have Telegram messenger on your laptop - we’re going to be interacting with each other on devnet and be using this to send wallet addresses around!

You don't need to know Rust, and no previous experience of cryptography or blockchain is needed.

🥗 Food: Lunch provided daily. Coffee, drink, and snacks available daily.

🚨 Action: Please respond to this email if you plan on attending.🚨

We look forward to hearing from you and congratulations on your acceptance!

(your regular email signature)

---

### 3 or so days before

Collect the email that replied to the ‘action required’ email and send them to your building security so attendees can access your building.

### Day before event

The day of the event it’s unlikely you will have time for room setup. Students will arrive before the event, and want to talk to you.

9AM: Room setup.

- Chairs
- Desks
- Power strips
- TV/projector
- Whiteboard, eraser, markers.

#### Morning of event

- **You will have little or no time in the hour before the event.** Someone will inevitably arrive early. Don’t leave anything to the last minute if you can.
- Write: wifi name on the whiteboard - people will arrive late, let them know Wifi password. Don’t use a slide for this, or you’ll forever be jumping back and forth to the slide with the WiFi details.
- As people arrive, greet them and let them know about Breakfast

#### Training

In order to put your Mac into a mode where:

- Keynote shows current slide, plus instructor notes, and the next slide
- The TV shows the current slide

You need to set display settings in your Mac. **This is not as obvious as it sounds.**

- Pick the TV and set ‘Use As’ to ‘Stop Mirroring’. Yes that doesn’t make any grammatical sense.
- You can now extend the display onto the TV.

**![img](https://lh7-us.googleusercontent.com/-4LcqN--vBE1wOZIDjcEcx0y3z1eOgL0KvVWqPA4i_pbA-3qrhCor_JzhwyKQGWS6VpbJ91s2dyUw_or3NxMUfn6_Hkg7nzi9rRXIy4N3LY7USSfr1wR-Txvk4l7D2fg45gQJ8F8tGpgQzvbhKdQnw)**

Common causes of students having troubles with the labs:

- Students with an out of date node.js There’s a node version check in the slides for this reason. Anything less than node 18 was at the time of writing unsupported by node.js maintainers. Running an out of date version will give you errors about strange characters like (`||=`) when reading random files.
- Students inconsistently moving between spellings of ‘favorites’ / ‘favourites’ during the Anchor lab.
- Editors other than VScode are fine, but you can use your own vscode / Rust Analyzer setup to work out why code doesn’t work
- If you’re really stuck about why a student’s code doesn’t work you can also paste over the answer and look at the differences in your git client.
- If you don’t know the answer to a question, that’s OK, tell the student you’ll chase an answer, and ask your colleagues on Slack.

#### Final day

Chase up any items the students have added to the’ to be addressed’ list

Ensure people know of:

- Solana Stack Exchange
- 'Program Examples' repo for Anchor

Essentially you want to make sure they're part of the wider Solana developer community and don't use the class Telegram for technical support!

**If people do ask technical questions on Telegram** direct them to Solana Stack Exchange.

Check for any lost property

Return extra merch/swag back to the storage area.

### After the Event

- Check [survey results on the TypeForm](https://admin.typeform.com/form/IPH0UGz7/results#responses)
- Correct any bugs in the course material and or instructor notes

- Send a follow up email, for example (modify as appropriate):

Send from personal account:

---

To: your email address

CC: **nobody** (important, don’t put anyone here as it will reveal ('dox') attendees to each other)

BCC: attendee list

Subject: Action Required: confirm attendance for Solana professional training next week

Body (modify accordingly):

---

Thanks for joining us at the first Solana Professional Developer Training! 🎉 I learned a lot and I hope you did, too. Here's a few resources to assist on your Solana journey:

🤓 Continue building with:

- [Solana Stack Exchange](https://www.web3builders.dev/) - Q and A. Search before posting!

- [Solana DevRel Program Examples](https://github.com/solana-developers/program-examples) - perpetually updated examples of Anchor Solana programs maintained by the Solana Foundation.

- [Web3 Builders Alliance](https://www.web3builders.dev/) - multiple week deep Solana development course. WBA graduates have built a lot of Hackathon winners and Solana ecosystem products.

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
