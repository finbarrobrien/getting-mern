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
      latLng: [Number(faker.address.longitude()), Number(faker.address.latitude())],
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
    for (let j = 0; j < 20; j += 1) {
      data[i].reviews.push({
        reviewer: faker.name.findName(),
        stars: faker.random.number() % 5,
        date: Date.now(),
        comment: faker.lorem.sentence(),
      });
    }
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
