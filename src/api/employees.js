import { requests } from "@/api/requests.js";

const path = "http://localhost:3000/employees";
export const employees = {
  all: async () => {
    const data = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await data.json();
  },
  addEmployee: (employee) => {
    return fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
  },
  getEmployee: async (id) => {
    const data = await fetch(path + `/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await data.json();
  },

  updateEmployee: (id, employee) => {
    return fetch(path + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(employee),
    });
  },

  removeEmployee: (id) => {
    fetch(path + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllEmployeesWithRequests: async function () {
    const employeesCollection = await this.all();
    const requestsCollection = await requests.all();
    return employeesCollection.map((employee) => {
      const employeeRequests = [];
      requestsCollection.forEach((request) => {
        if (request.reviewersIds.includes(employee.id)) {
          employeeRequests.push(request);
        }
      });
      return { ...employee, requests: employeeRequests };
    });
  },
};
