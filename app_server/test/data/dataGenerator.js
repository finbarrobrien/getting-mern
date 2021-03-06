/**
 * Created by Finbarr on 22/02/2017.
 */
import faker from 'faker';

const randomData = () => {
  const data = [];
  for (let i = 0; i < 1000; i += 1) {
    data.push({
      name: faker.company.companyName(),
      address: faker.address.streetAddress(),
      latLng: [
        (-((Math.random() * (10.5 - 5.4)) + 5.4)).toFixed(4),
        ((Math.random() * (55.4 - 51.4)) + 51.4).toFixed(4),
      ],
      openingTimes: [{
        days: 'Monday - Friday',
        open: '08:00',
        close: '17:00',
        closed: false,
      },
      {
        days: 'Saturday',
        open: '08:00',
        close: '17:00',
        closed: false,
      },
      {
        days: 'Sunday',
        closed: true,
      }],
      facilities: ['coffee', 'wifi'],
      reviews: [],
    });
    let average = 0;
    for (let j = 0; j < 20; j += 1) {
      const stars = (faker.random.number() % 5) + 1;
      average += stars;
      data[i].reviews.push({
        reviewer: faker.name.findName(),
        stars: stars,
        date: Date.now(),
        comment: faker.lorem.sentence(),
      });
    }
    data[i].stars = Math.round(average / 20);
  }
  return data;
}

export default randomData;
/*

name
address
stars
latlng
openingTimes
 days
 open
 close
 closed
facilities
reviews
 reviewer
 date
 stars
 comment
*/
