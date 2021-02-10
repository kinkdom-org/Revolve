module.exports = {

    start(message) {

        let intro = message.content;

        intro = intro.replace(/\*/g, '');
        intro = intro.replace(/\-/g, '');
        intro = intro.replace(/\_/g, '');

        let issues = [];

        const sectionsFound = this.testTemplate(intro)

        if (sectionsFound < 3) {
            return null;
        }
        else if (sectionsFound < 7 || sectionsFound > 7) {
            let report = `Unfortunately, I can't recognize the template you are using (expected 7 sections, found ${sectionsFound}). Please copy/paste our premade template from the <#280310669889372161> channel. All sections must be present, and the section names should not be changed. Contact a staff member if you need help!`;
            return this.buildResponse(message, report);
        }

        /*
        const testFunctions = [this.testAge, this.testGender, this.testLocation, this.testOrientation, this.testKinks, this.testBlacklist, this.testAbout]

        testFunctions.forEach(
            let string = func(intro);
        if (string) issues.push(string);
        );
        */

        let ageString = this.testAge(intro);
        if (ageString) issues.push(ageString);

        let genderString = this.testGender(intro);
        if (genderString) issues.push(this.testGender(intro));

        let locationString = this.testLocation(intro);
        if (locationString) issues.push(this.testLocation(intro));

        let orientationString = this.testOrientation(intro);
        if (orientationString) issues.push(this.testOrientation(intro));

        let kinksString = this.testKinks(intro);
        if (kinksString) issues.push(this.testKinks(intro));

        let blacklistString = this.testBlacklist(intro);
        if (blacklistString) issues.push(this.testBlacklist(intro))

        let aboutString = this.testAbout(intro);
        if (aboutString) issues.push(this.testAbout(intro));

        let report = this.buildReport(issues);
        return this.buildResponse(message, report);

    },

    testTemplate(intro) {

        const regex = RegExp(/^(age|gender|(location|timezone)|orientation|kinks|(blacklist|limits)|(about|bio)):/gim);
        const match = intro.match(regex);
        if (!match) return 0;

        return match.length;

    },

    getAdverb() {

        return this.rand(["Be sure to", "Make sure to", "Make sure that you", "Double check that you", "Please make sure to", "Please", "Don't forget to"])

    },

    testAge(intro) {

        let regex = RegExp(/^age:\s*(\D*\b[1-9]?[0-9]\b.*)$/gim);
        const age = intro.match(regex);
        if (!age) return `${this.getAdverb()} state your age using two digits.`;

        regex = RegExp(/(\+|over|under|around|about|ca)/gi);
        const nonExactAge = regex.test(age[0]);
        if (nonExactAge) return `${this.getAdverb()} state your exact age.`;

        regex = RegExp(/(\b1[0-7]\b|\b[1-9]\b)/gi);
        const underage = regex.test(age[0]);
        if (underage) {
            const staff_report = require('./staff_report');
            staff_report.post("underage", intro, age[0])
            return "You must be an adult to use this server. The staff have been notified.";
        }

        return null;

    },

    testGender(intro) {

        const regex = RegExp(/^gender:.*(\bmale\b|\bfemale\b|\bfem[- ]?boy\b|\btrap\b|\bfuta(nari)?\b|\btrans[- ]?(sexual)?\b|\b(gender)?[- ]?fluid\b|\bnon[- ]?binary\b|\btom[- ]?boy\b|\bbutch\b)/gim);
        const gender = regex.test(intro);
        if (!gender) return `${this.getAdverb()} use one of our existing gender roles. A list of these can be found in <#280310669889372161>.`;

        return null;

    },

    testLocation(intro) {

        const regex = RegExp(/^(location|time[- ]?zone):.*\w{2,}/gim);
        const location = regex.test(intro);
        if (!location) return `${this.getAdverb()} state your location. You may optionally use your timezone.`;

        return null;

    },

    testOrientation(intro) {

        const regex = RegExp(/^orientation:.*(\bstraight\b|\bhetero(sexual)?\b|\bbi(sexual)?\b|\bbi[- ]?curious\b|\bgay\b|\blesbian\b|\bhomosexual\b|\bpan(sexual)?\b|\ba[- ]?sexual\b)/gim);
        const orientation = regex.test(intro);
        if (!orientation) return `${this.getAdverb()} use one of our existing orientation roles. A list of these can be found in <#280310669889372161>.`;

        return null;

    },

    testKinks(intro) {

        const regex = RegExp(/^kinks:.*(,.+){2,}/gim);
        const kinks = regex.test(intro);
        if (!kinks) return `${this.getAdverb()} list three or more specific kinks in your Kinks section. Separate them by commas.`;

        return null;

    },

    testBlacklist(intro) {

        const regex = RegExp(/^(blacklist|limits):.*(,.+){2,}/gim);
        const blacklist = regex.test(intro);
        if (!blacklist) return `${this.getAdverb()} list three or more specific kinks in your Blacklist section. Separate them by commas.`;

        return null;

    },

    testAbout(intro) {

        const regex = RegExp(/^(about|bio):(.*\n?)*/gim);
        const about = intro.match(regex);
        if (!about) return "I cannot find your About section!";

        if (about[0].length < 50) return "Your About section is far too short. Expand it greatly. Maybe write about your hobbies or your past RP experiences?";
        if (about[0].length < 150) return "Your About section needs work. Please expand it by 5-6 sentences. Maybe write about your hobbies or your past RP experiences?";
        if (about[0].length < 250) return "Your About section is too short. Expand it by 3-4 sentences. Tell us about something fun you've experienced!";
        if (about[0].length < 350) return "Your About section does not yet meet our requirements. Expand it by 2-3 sentences.";
        if (about[0].length < 420) return "Your About section is a bit too short. Expand it by a couple sentences."

        return null;

    },

    rand(array) {
        return array[Math.floor(Math.random() * array.length)];
    },

    buildIssueList(issues) {

        let issue_list = "";

        //const emoji = [":one:", ":two:", ":three:", ":four:", ":five:", ":six:", ":seven:", ":eight:"]
        if (issues.length > 1) {
            issues.forEach((issue, index) => {
                issue_list += `\t${index + 1}. ${issue}\n`;
            });
        }
        else if (issues.length == 1) {
            issue_list += `\t\- ${issues[0]}\n`;
        }

        return issue_list;

    },

    buildReport(issues) {

        let report = "";
        
        if (issues.length > 1) {

            let fix_issues_1 = this.rand(["To prevent long waits and multiple revisions,", "To expedite the approval process,", "No one likes long waits, so"]);
            let fix_issues_2 = this.rand(["I've made a convenient list of things you should do to improve your intro.", "I've gathered a handy list of things you should do to improve your introduction further."]);
            let end = "Feel free to repost your introduction once you have made these changes, and I'll be happy to review it again!";

            let issue_list = this.buildIssueList(issues);

            report += `${fix_issues_1} ${fix_issues_2}\n\n${issue_list}\n${end}`;

        }
        else if (issues.length == 1) {

            let fix_issue_1 = this.rand(["You're doing great!", "Almost there!", "You're getting close!"])
            let fix_issue_2 = this.rand(["I've found one thing you should do to improve your introduction:", "There's still one thing you should do to improve your intro:", "A problem was detected and I would love to assist you in solving it:"])
            let end = "Feel free to repost your introduction once you have done the above, and I'll be happy to review it again!";

            let issue_list = this.buildIssueList(issues);

            report += `${fix_issue_1} ${fix_issue_2}\n\n${issue_list}\n${end}`;

        }
        else {

            let all_good_1 = this.rand(["According to my cognitive ability,", "According to my tingling feelings,", "According to my unique superpowers,", "According to my ongoing research,", "According to my cutting-edge technology,", "According to my gut feeling,", "According to Tal's gentle breathing,"])
            let all_good_2 = this.rand(["I think your intro looks good!", "I think your introduction appears adequate!", "I've found your intro to look sufficient!", "I think your introduction looks great!"])
            let all_good_3 = this.rand(["But I'm still learning!", "But I'm just a machine!", "But I am just a boot!", "But I'm not allowed to approve you alone...", "But my creator told me not to approve anyone...", "But my math might be off.", "But my creator is still working on my arms."])
            let all_good_4 = this.rand(["Let's patiently wait for a hooman to review it.", "Please hold for a hooman to assist in your approval."])

            report += `${all_good_1} ${all_good_2} ${all_good_3} ${all_good_4}`;

        }

        return report;

    },

    buildResponse(message, report) {

        let greeting = this.rand(['Hey', 'Hello', 'Hi', 'Hiya', 'Heya', 'Hiyo', 'Hey there', 'Good day', "G'day", 'Howdy', 'Hoi', 'Oi']);

        return `${greeting}, ${message.member}! ${report}`;

    }

}

