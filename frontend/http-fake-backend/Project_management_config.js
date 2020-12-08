'use strict';

/**
* Config file for a https://github.com/micromata/http-fake-backend to
* mock the PythonBankBeispiel backend.
*
* Just place in ./server/api folder.
*/

const SetupEndpoint = require('./setup/');

const prefix = "/project"

module.exports = SetupEndpoint({
    name: 'project',
    urls: [{
        params: '/student/{id}',
        requests: [{
            method: ['GET'],
            response: '/response-files/project/students.json'
        },
        {
            method: ['POST'],
            response: '/response-files/project/students.json'
     
        }, {
            method: 'DELETE',
            response: '/response-files/project/students.json'
        }]
    },  {
        params: '/projects',
        requests: [{
            method: 'GET',
            response: '/response-files/project/projects.json'
        }]
    }, {
        params: '/projects/{id}',
        requests: [{
            method: 'GET',
            response: '/response-files/project/projects.json'
        },
        ]
    }, {
        params: '/projects/{id}/capacity',
        requests: [{
            method: 'GET',
            response: '/response-files/project/capacity.json'
        }]
    }
    ]
});

