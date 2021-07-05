const configs = {
  getLoginCreds: "users/login",
  getProducts: "products/",
  getAllStatus: "tickets/ticket-status",
  getTicketsByStatus: "tickets/status",
  getAllAdmins: "users/admins",
  changeTicketAssignee: "tickets/assign/",
  getAllDepartments: "master-data/departments",
  searchUser: "users/searchUser",
  assignDepttoUser: "users/admin-assign",
  getUserRole: "users/fetchRoles",
  changeUserRole: "users/saveUserRole",
  getUserDepartment: "dashboard/user/department",
  getAllRoles: "users/fetchAllRoles",
  getAllReplies: "tickets/replies",
  getEmployeeTicketStatusCount: "dashboard/ticketStatusCounts",
  getEmployeeSla: "dashboard/missedResolvedCounts",
  getUserTickets: "dashboard/getAssignedTickets",
};

export default configs;
