function sendMail() {
  const userName = document.getElementById("name").value;
  const userMail = document.getElementById("email").value;

  const emailBody = `Dear ${userName},
We are thrilled to invite you to the Digital CXO.Live community, where you can connect with like-minded professionals and explore various social media channels tailored to your interests.

This page serves as a gateway to join our vibrant social media channels. Feel free to join any of the channels listed below:

1. Core Industry channels:
- Digital Transformation: WhatsApp Group Link - https://chat.whatsapp.com/Hsxnb3pepn5767bz7vDAo1
- Digital Transformation on Facebook: Facebook Group Link - https://www.facebook.com/groups/DigitalCXO/
- Retail Tech: WhatsApp Group Link - https://chat.whatsapp.com/J5APi6odPa8JwxfP7mNFjz
- Fintech: WhatsApp Group Link - https://chat.whatsapp.com/HTPyRL6kGJiEZuPj9ehru6
- Manufacturing Tech: WhatsApp Group Link - https://chat.whatsapp.com/DVIbGDAnKh8D8Mbpytxk9v
- Supply chain Tech: WhatsApp Group Link - https://chat.whatsapp.com/DYlt7zUAqS7E8ikkarlT0d
- Health Tech: WhatsApp Group Link - https://chat.whatsapp.com/EbHEZkp9XRw2hs0ctyFonW

2. Core Technologies:
- Artificial Intelligence (AI): WhatsApp Group Link - https://chat.whatsapp.com/GP7TKDbQZXk3GGNBfXu81O
- Cloud: WhatsApp Group Link - https://chat.whatsapp.com/B6VKWOEYmyRAjULHSP8PtH
- Data Analytics: WhatsApp Group Link - https://chat.whatsapp.com/KRetlLLo2e8Ik0XgMBhwTb
- Tech Architecture: WhatsApp Group Link - https://chat.whatsapp.com/ByGjJru1VPJJWRJ4CGtRq2
- Coding: WhatsApp Group Link - https://chat.whatsapp.com/I25YSnDIGR58YlrmQAwvas

3. Lifestyle for Tech Leaders:
- Travel: Goa-for-techies: WhatsApp Group Link - https://chat.whatsapp.com/CHk8Yku1wrp6i0vJudoCoQ
- Travel: Himalayas-for-techies: WhatsApp Group Link - https://chat.whatsapp.com/DsNM8c0RziAGtnhFBOdioA

4. Personal enrichment:
- Career: WhatsApp Group Link - https://chat.whatsapp.com/JMQFkjIp2rCJ8lzTYS0ldT

We are continuously expanding and enhancing our channels to provide valuable resources and foster meaningful connections. If you have any feedback or suggestions, please don't hesitate to reach out to the Digital CXO.Live 
forum founders at digitalcxolive@gmail.com.

Thank you for joining Digital CXO.Live! We look forward to your active participation in our thriving community.`;

  var params = {
    name: userName,
    email: userMail,
    message: emailBody,
  };

  const serviceID = "service_a4dbk4d";
  const templateID = "template_ke2z0ij";

  emailjs
    .send(serviceID, templateID, params)
    .then((res) => {
      console.log(res);
      alert("Your message sent successfully!!");
    })
    .catch((err) => console.log(err));
}
