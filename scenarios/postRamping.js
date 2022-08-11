import http from 'k6/http';

export let options = {
    scenarios: {
        getSuccess: {
            executor: 'ramping-arrival-rate',
            startRate: 1,
            stages: [
                { target: 5, duration: '5s' },
                { target: 15, duration: '5s' },
                { target: 0, duration: '10s' }
            ],
            preAllocatedVUs: 20,
        },
    },
};

export default function () {
  const url = 'http://test.k6.io/login';
  const payload = JSON.stringify({
    email: 'aaa',
    password: 'bbb',
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(url, payload, params);
}
