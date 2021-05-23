import { employees } from "@/api/employees.js";
const path = "http://localhost:3000/requests";
export const requests = {
  all: async () => {
    const data = await fetch(path, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await data.json();
  },
  addRequest: (request) => {
    return fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  },
  getRequest: async (id) => {
    const data = await fetch(path + `/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await data.json();
  },

  updateRequest: (id, request) => {
    return fetch(path + `/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  },

  removeRequest: (id) => {
    fetch(path + `/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
  getAllRequestsWithEmployees: async function () {
    const employeesCollection = await employees.all();
    const requestsCollection = await this.all();
    return requestsCollection.map((request) => {
      const requestReviewers = [];
      employeesCollection.forEach((employee) => {
        if (request.reviewersIds.includes(employee.id)) {
          requestReviewers.push(employee);
        }
      });
      return { ...request, reviewers: requestReviewers };
    });
  },
};
