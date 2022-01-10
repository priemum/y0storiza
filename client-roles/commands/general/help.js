module.exports = {
	name: 'help', // اسم الامر
	description: "Help Of Commands", // شرح الامر
	cooldown: 1, // الكول داون بـ الثواني
	execute: async function(client ,msg , args, db) {
let row = await db.find({id: client.user.id})
if(row.length < 1) return;
let prefix = row[0] ? row[0].prefix : "#"

client.createMessage(msg.channel.id, {
  "embed": 
    {
      "title": "Roles Bot , Help list [ My Perfix Now Is [prefix] ] ".replace('[prefix]', prefix),
      "color": 26282,
      "fields": [
        {
          "name": "General",
          "value": "`[prefix]ping`, `[prefix]buy`".split("[prefix]").join(prefix)
        },
        {
          "name": "Moderator",
          "value": "`[prefix]setowner`, `[prefix]removerole`, `[prefix]addrole`, `[prefix]setprobot`".split("[prefix]").join(prefix)
        },
        {
          "name": "Premium",
          "value": "`[prefix]vip`, `[prefix]vip move`, `[prefix]vip invite`, `[prefix]vip reinvite`\n`[prefix]vip name`, `[prefix]vip avatar`, `[prefix]vip prefix`, `[prefix]vip game`".split("[prefix]").join(prefix)
        }
      ]
    }
  
})
	},
};
