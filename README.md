# 🧑🏼‍🎓 Solana Professional Education

The Solana Professional Education repo has everything you need for running Solana training events and instructing the courses.

The training covers cryptography fundamentals, blockchain, and Solana from the ground up, with frequent hands-on labs. By the end of the training, students will be able to create and transfer tokens, mint NFTs, and build DeFi programs using Anchor on Rust.

This repo has everything you need to plan and teach the course:

- The [Event planning playbook](./EVENT-PLANNING.md)
- The [Instructor presentations](./presentations). We use Keynote as there are animations in some slides, and other presentation tools don't have Keynote's 'magic move' or SVG support. For those on Linux or Windows we can produce web-based versions of the presentation on demand.
- Working [solutions to each lesson's labs](./labs), following the [Solana Foundation style guide](https://github.com/solana-developers/program-examples/blob/main/CONTRIBUTING.md).
- The [Agenda](./AGENDA.md) for local and remote training sessions

You can also [contact Mike MacCana](mailto:mike.maccana@solana.org) for help.

> [!NOTE]  
> If you want to attend a training event and learn Solana (rather than run a training event yourself), follow [@solana_devs on X](https://x.com/solana_devs), and we'll let you know when the next course is running in a city near you or on Zoom!

## Versions

The training is written and tested with the following software. **Students should avoid using older or newer software** - the objective of the course is to understand Solana rather than to debug issues the first time using the platform.

- node.js 22
- Solana CLI 1.18.x (whichever the latest 1.18 release is)
- Anchor 0.30.1.

## Training Offerings

### Main course

**Timeframe**: Four days full-time in-classroom, or 12 x 2-hour remote lessons.

**Audience**: anyone proficient in TypeScript who wants to learn blockchain. Prior knowledge of cryptography, blockchain, Rust or Anchor is not required - see [aims of the training](https://github.com/solana-developers/professional-education/blob/main/README.md#aims-of-the-training).

**Outcome**: Create and transfer tokens, build a solana smart contract from scratch

**Content**: [Solana Professional Education presentation](presentations/Solana%20Professional%20Education.key)

**Prior setup**: Laptop with node.js 22 or newer, Windows machines much have WSL2 and Windows terminal installed.

### One day Smart Contract Intensive

**Timeframe**: One day

**Audience**: Prior experience of strictly typed language, and basic understanding of Solana itself

**Outcome**: Build a solana smart contract from scratch

**Content**: [Solana Professional Education presentation](presentations/Solana%20Professional%20Education.key), with lessons 1-4 without labs, then straight into Lab 6, Anchor.

**Prior setup**: Laptop with node.js 22 or newer, Windows machines much have WSL2 and Windows terminal installed. Solana CLI 1.18 and Anchor 0.30.1.

### One hour blockchain / smart contract overview

**Timeframe**: 40 minutes - one hour

**Audience**: Technical audience

**Outcome**: Understand operation of Solana smart contracts

**Content**: see [Build your first DeFi app in 30 minutes keynote presentation](presentations/Build%20your%20first%20DeFi%20app%20in%2030%20minutes.key)

**Prior setup**: Laptop with node.js 22 or newer, Windows machines much have WSL2 and Windows terminal installed.

## Standard details for all offerings

**Student time** is 10 AM to 4 PM.

**Instructor time** is 9 AM to 5 PM.

**Class sizes**:

- In person, between 10 and 15 people, you want to spend time with every student, and larger class sizes are difficult for a single instructor to manage.
- Online: no maximum. Personalized attention will be limited for larger events.

**Lead time**: 1-month minimum, ideally six weeks

You may want to visit the [Agenda](./AGENDA.md) or [Event planning playbook](./EVENT-PLANNING.md) now.

## Aims of the training

### Applicable to the broadest group of potential Solana developers.

The training requirements are simple: any developer with TypeScript experience. Specifically, no cryptography, blockchain, or Rust experience is required. We chose TypeScript because it's the language of the JS/TS SDKs, and because understanding strictly typed languages is considered necessary to learn Rust.

**The course is not a beginner course**. Just because the course has low prerequisites does not mean it is only for beginners. As part of the course, students will write Anchor / Rust code from scratch and deploy that code to Solana devnet.

### Low time to 'hello world'

Students have a limited amount of attention, and their learning should be focused on the requirements for the next task. Anything that isn't relevant to their next task should be removed. For example, if the next task is sending tokens, and JSON RPC knowledge isn't required to perform this task (which it isn't), remove the JSON RPC content.

### Do real things on a real network

We don't need to discuss Solana's benefits. If a student is attending the course, they likely already know that Solana is fast and cheap and has considerable developer and financial activity. We can show the benefits of Solana live on devnet.

### Students must be able to stand on their own two feet after training is over.

Students must be able to create their own projects after finishing the course. This means:

- Using the students' own computers rather than sandbox applications like Solana Playground.
- Creating projects srarting with a blank file or `anchor init`
- Using public, tested open source modules rather than cloning existing repos.

### Smaller steps

Student drop-off - high even in some of the best-regarded ecosystem training - often happens when the class moves faster than individual students, and those students become so far behind the rest of the group they can't keep up. Smaller steps allow the class to proceed as a group, enable the group to discuss each step in detail, and increase the chances of everyone getting through every exercise.

### Focus on Solana

Many existing Solana courses are slowed down unnecessarily due to issues that have nothing to do with Solana. The Solana Professional Training program is not a course in JavaScript frameworks, mobile development, IIFEs (`;(async function(){})();`), or any other topic.

## Tips for teaching

- Please make sure you've read and understood 'Aims of the Training' above. Specifically, make sure to **keep the focus on practice over theory**. Students learn more from building than they do from having someone present to them. **Don't add unnecessary theory that slows down the time taken to get to the next lab, and adds cognitive overload** - if something isn't necessary to understand the next lab, it shouldn't be there.

- If training remotely, you may prefer **Google Classroom** over zoom. It has breakout rooms, which allow individual students to and staff to break out into rooms together.

- Sometimes some students finish before others. In a physical room, give students that complete fast a challenge of helping other students that need it. In a virtual room, you can use Google Classroom. This keeps fast students entertained while helping slower students catch up.

## Ready to plan an event?

Check out the [pick an event to run](./AGENDA.md) and start [planning to run it](./EVENT-PLANNING.md).
