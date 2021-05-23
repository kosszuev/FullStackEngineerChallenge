import Vue from "vue";
import VueRouter from "vue-router";
import Employees from "../views/Employees.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Employees",
    component: Employees,
  },
  {
    path: "/employee/:id",
    name: "EmployeePage",
    component: () => import("../views/EmployeePage.vue"),
  },
  {
    path: "/request/:requestId/:reviewerId",
    name: "RequestPage",
    component: () => import("../views/RequestPage.vue"),
    props: true,
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("../views/Admin.vue"),
    children: [
      {
        path: "",
        redirect: "employees",
      },
      {
        path: "employees",
        name: "EmployeesList",
        component: () => import("../views/admin/EmployeesList.vue"),
      },
      {
        path: "requests",
        name: "RequestsList",
        component: () => import("../views/admin/RequestsList.vue"),
      },
      {
        path: "employee/new",
        name: "EmployeeCreate",
        component: () => import("../views/admin/EmployeeCreate.vue"),
      },
      {
        path: "employee/edit/:id",
        name: "EmployeeEdit",
        component: () => import("../views/admin/EmployeeEdit.vue"),
      },
      {
        path: "request/new",
        name: "RequestCreate",
        component: () => import("../views/admin/RequestCreate.vue"),
      },
      {
        path: "request/edit/:id",
        name: "RequestEdit",
        component: () => import("../views/admin/RequestEdit.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
