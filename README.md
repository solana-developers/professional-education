# 🧑🏼‍🎓 Solana Professional Education

The Solana Professional Education repo has everything you need for running a training event and instructing the course.

The training covers cryptography fundamentals, blockchain, and Solana from the ground up, with frequent hands-on labs. By the end of the training, students will be able to create and transfer tokens, mint NFTs, and build DeFi programs using Anchor on Rust.

This repo has everything you need to plan and teach the course:

- The [Instructor presentation](./Solana%20Professional%20Education.key). We use Keynote as there are animations in some slides, and other presentation tools don't have Keynote's 'magic move' or SVG support. There is also a [web version of the instructor presentation](https://www.icloud.com/keynote/001TXNMStPSD91jj5cS33eSbw#Solana_Professional_Education).
- The files in [`labs`](./labs) are working solutions to each lesson's labs.
- The [Agenda](./AGENDA.md) for local and remote training sessions
- The [Event planning playbook](./EVENT-PLANNING.md)

You can also [contact Mike MacCana](mailto:mike.maccana@solana.org) for help.

> [!NOTE]  
> If you want to learn Solana, not run a training event, follow [@solana_devs on X](https://x.com/solana_devs), and we'll let you know when the next course is running in a city near you or on Zoom!

## Aims of the training

### Applicable to the broadest group of potential Solana developers.

The training requirements are simple: any developer with TypeScript experience. Specifically, no cryptography, blockchain, or Rust experience is required. We chose TypeScript because it's the language of the JS/TS SDKs, and because understanding strictly typed languages is considered necessary to learn Rust.

**The course is not a beginner course**. Just because the course has low prerequisites does not mean it is only for beginners. As part of the course, students will write Anchor / Rust code from scratch and deploy that code to Solana devnet.

### Low time to 'hello world'

Students have a limited amount of attention, and their learning should be focused on the requirements for the next task. Anything that isn't relevant to their next task should be removed. For example, if the next task is sending tokens, and JSON RPC knowledge isn't required to perform this task (which it isn't), remove the JSON RPC content.

### Do real things on a real network

We don't need to discuss Solana's benefits. If a student is attending the course, they likely already know that Solana is fast and cheap and has considerable developer and financial activity. We can show the benefits of Solana live on devnet.

### Students must be able to stand on their own two feet after training is over.

Students must be able to create their own projects after finishing the course:=. This means:

- Using the students' own computers rather than sandbox applications like Solana Playground.
- Creating projects srarting with a blank file or `anchor init`
- Using public, tested open source modules rather than cloning existing repos.

### Smaller steps

Student drop-off - high even in some of the best-regarded ecosystem training - often happens when the class moves faster than individual students, and those students become so far behind the rest of the group they can't keep up. Smaller steps allow the class to proceed as a group, enable the group to discuss each step in detail, and increase the chances of everyone getting through every exercise.

### Focus on Solana

Many existing Solana courses are slowed down unnecessarily due to issues that have nothing to do with Solana. The Solana Professional Training program is not a course in JavaScript frameworks, mobile development, IIFEs (`;(async function(){})();`), or any other topic.

## Training Offering

**Four days **full-time** in-classroom**, or **12 x 2-hour remote lessons**.

**Audience**: aimed at anyone proficient in TypeScript who wants to learn blockchain.

The aim is to focus on the broader audience of people who want/need to build things rather than blockchain enthusiasts or Rust programmers. Hence, prior knowledge of blockchain or cryptography is not required.

**Student time** is 10 AM to 4 PM.

**Instructor time** is 9 AM to 5 PM.

**Class sizes**: Generally, between 10 and 15 people, you want to spend time with every student, and larger class sizes are difficult for a single instructor to manage.

**Lead time**: 1-month minimum, ideally six weeks

You may want to visit the [Agenda](./AGENDA.md) or [Event planning playbook](./EVENT-PLANNING.md) now.
