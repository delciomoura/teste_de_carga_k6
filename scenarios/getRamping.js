import { Rate } from 'k6/metrics';
import http from 'k6/http';

const SUCCESS_RATE = new Rate("successful requests");

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
    let response = http.get('http://test.k6.io');
    SUCCESS_RATE.add(response.status == 200);
};
