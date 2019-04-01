import Sign from '../src/views/sign.vue'
import Manager from '../src/views/manager.vue'

import index from '../src/index.vue'
import announce from '../src/announce.vue'
import visitor from '../src/visitor.vue'
import reviewMessage from '../src/reviewMessage.vue'
import message from '../src/message.vue'
import addressList from '../src/addressList.vue'
import lookMonitor from '../src/lookMonitor.vue'
import dutyChange from '../src/dutyChange.vue'
import dutyRegister from '../src/dutyRegister.vue'
import caseEntry from '../src/caseEntry.vue'
import maintenanceRecord from '../src/maintenanceRecord.vue'
import roomSituation from '../src/roomSituation.vue'
import badPerson from '../src/badPerson.vue'
import borrowReturn from '../src/borrowReturn.vue'
import dutyRegisterCount from '../src/dutyRegisterCount.vue'
import dutyReportsCount from '../src/dutyReportsCount.vue'
import workSummary from '../src/workSummary.vue'
import addAccount from '../src/addAccount.vue'
import setAccount from '../src/setAccount.vue'



export default [
    {
        path: '/',
        redirect: '/sign'
    },
    {
        path: '/sign',
        component: Sign
    },
    {
        path: '/manager',
        component: Manager,
        children: [
            {
                path: 'index',
                component: index
            },
            {
                path: 'announce',
                component: announce
            },
            {
                path: 'visitor',
                component: visitor
            },
            {
                path: 'reviewMessage',
                component: reviewMessage
            },
            {
                path: 'message',
                component: message
            },
            {
                path: 'addressList',
                component: addressList
            },
            {
                path: 'lookMonitor',
                component: lookMonitor
            },
            {
                path: 'dutyChange',
                component: dutyChange
            },
            {
                path: 'dutyRegister',
                component: dutyRegister
            },
            {
                path: 'caseEntry',
                component: caseEntry
            },
            {
                path: 'maintenanceRecord',
                component: maintenanceRecord
            },
            {
                path: 'roomSituation',
                component: roomSituation
            },
            {
                path: 'badPerson',
                component: badPerson
            },
            {
                path: 'borrowReturn',
                component: borrowReturn
            },
            {
                path: 'dutyRegisterCount',
                component: dutyRegisterCount
            },
            {
                path: 'dutyReportsCount',
                component: dutyReportsCount
            },
            {
                path: 'workSummary',
                component: workSummary
            },
            {
                path: 'addAccount',
                component: addAccount
            },
            {
                path: 'setAccount',
                component: setAccount
            },
        ]
    }
]