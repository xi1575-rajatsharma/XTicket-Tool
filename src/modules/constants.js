const API_HOST_PATH = 'http://168.63.250.105';
// http://3.7.115.94
// const API_HOST_PATH = 'https://xdesk.herokuapp.com'
export const constants = {
    SUCCESS: 'success',
    FAILURE: 'failure',
    SERVICE_URLS: {
        LOGIN: `${API_HOST_PATH}/ticket-tool/v1/users/login`,
        TICKET_LISTING: `${API_HOST_PATH}/ticket-tool/v1/tickets`,
        TICKET_DETAILING: `${API_HOST_PATH}/ticket-tool/v1/tickets`,
        TICKET_REPLY: `${API_HOST_PATH}/ticket-tool/v1/tickets/replies/`,
        TICKET_ASSIGN: `${API_HOST_PATH}/ticket-tool/v1/tickets/assign/`,
        TICKET_STATUS: `${API_HOST_PATH}/ticket-tool/v1/tickets/change-status/`,
        TICKET_RESOLUTION: `${API_HOST_PATH}/ticket-tool/v1/tickets/resolution/`,
        TICKET_ADD: `${API_HOST_PATH}/ticket-tool/v1/tickets`,
        TICKET_MASTER_DATA: `${API_HOST_PATH}/ticket-tool/v1/master-data/`,
        TICKET_VIEW_ADMIN: `${API_HOST_PATH}/ticket-tool/v1/users/admins`,
        TICKET_HISTORY: `${API_HOST_PATH}/ticket-tool/v1/tickets/ticket-journey/`,
        GET_TICKET_STATUS: `${API_HOST_PATH}/ticket-tool/v1/tickets/ticket-status`,
        GIVE_FEEDBACK: `${API_HOST_PATH}/ticket-tool/v1/feedback/`,
        DOWNLOAD_FILE: `${API_HOST_PATH}/ticket-tool/v1/tickets/download/3?fileName=`
    },


    NO_DATA_FOUND: 'No results found...'
};