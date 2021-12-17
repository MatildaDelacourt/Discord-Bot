import { Message, MessageEmbed } from 'discord.js';
const axios = require('axios').default;
import dotenv from 'dotenv';
import moment from 'moment';
//JS
// module.exports = {}
dotenv.config();
const api = process.env.OPEN_WEATHER;
// TS:
export default {
  callback: async (message: Message, ...args: string[]) => {
    console.log(args);
    const city = args.join(' ');
    let url = `https://api.openweathermap.org/data/2.5/weather?q=Chicago&appid=${api}&units=imperial`;
    url = url.replace('Chicago', city);
    let response;
    try {
      response = await axios.get(url);
      //console.log(response.data);
    } catch (error) {
      console.error(error);
      message.reply('Sorry cannot do weather right now.');
      return;
    }
    const data = response.data;
    const temp = data.main.temp.toFixed(0);
    const low = data.main.temp_min.toFixed(0);
    const high = data.main.temp_max.toFixed(0);
    const name = data.name;
    const country = data.sys.country;
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    const sunriseraw = data.sys.sunrise;
    const sunsetraw = data.sys.sunset;
    const timezone = data.timezone;
    const sunrise = moment
      .unix(sunriseraw + timezone)
      .utc()
      .format('h:mm a');
    const sunset = moment
      .unix(sunsetraw + timezone)
      .utc()
      .format('h:mm a');

    const weatherEmbed = new MessageEmbed()
      .setColor('YELLOW')
      .setTitle(`Current Weather In ${name}, ${country}`)
      .setAuthor('Matilda Delacourt')
      // http://openweathermap.org/img/wn/10d@2x.png
      .setDescription(`${temp} °F and ${description}`)
      .setThumbnail(`http://openweathermap.org/img/wn/${icon}@2x.png`)
      .addFields(
        // { name: 'Regular field title', value: 'Some value here' },
        // { name: '\u200B', value: '\u200B' },
        { name: 'Low', value: `${low} °F`, inline: true },
        { name: 'High', value: `${high} °F`, inline: true }
      )
      .addField('\u200b', '\u200b')
      .addFields(
        // { name: 'Regular field title', value: 'Some value here' },
        // { name: '\u200B', value: '\u200B' },
        { name: 'Sunrise', value: `${sunrise}`, inline: true },
        { name: 'Sunset', value: `${sunset}`, inline: true }
      )
      .setTimestamp()
      .setFooter('Weather from any part of the world');

    message.reply({ embeds: [weatherEmbed] });
  },
};
