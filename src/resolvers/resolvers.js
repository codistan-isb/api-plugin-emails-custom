import ReactionError from "@reactioncommerce/reaction-error";

export default {
    Mutation: {
        async sendContactForm(_, { name, email, phoneNumber, message }, context, info) {
            const {
                collections: { Shops },
            } = context;
            const shop = await Shops.findOne({ shopType: "primary" });
            console.log(shop)
            if (!shop) throw new ReactionError("not-found", "Shop not found");
            const emailBody = `Name: ${name}\nEmail: ${email}\nPhone Number: ${phoneNumber}\nMessage: ${message}`;
            console.log("emailBody:- ", emailBody)
            console.log("shop email:- ", shop.emails[0].address)
            const sendEmailResult = await context.mutations.sendEmail(context, {
                to: shop.emails[0].address,
                data: emailBody,
                subject: "Contact Form Submission",
                fromShop: shop,
            })
            console.log("sendEmailResult:- ", sendEmailResult)
            if (sendEmailResult) {
                return true;
            } else {
                throw new ReactionError("Failed", "Failed to send email. Try again later");
            }
        }
    }
}