"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/courses/enrolled/route";
exports.ids = ["app/api/courses/enrolled/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "bcrypt":
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),

/***/ "./action-async-storage.external?8dda":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "./request-async-storage.external?3d59":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "./static-generation-async-storage.external?16bc":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcourses%2Fenrolled%2Froute&page=%2Fapi%2Fcourses%2Fenrolled%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcourses%2Fenrolled%2Froute.ts&appDir=%2FUsers%2Fsachin%2FDocuments%2FLearnLogicify%2FProjects%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsachin%2FDocuments%2FLearnLogicify%2FProjects&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcourses%2Fenrolled%2Froute&page=%2Fapi%2Fcourses%2Fenrolled%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcourses%2Fenrolled%2Froute.ts&appDir=%2FUsers%2Fsachin%2FDocuments%2FLearnLogicify%2FProjects%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsachin%2FDocuments%2FLearnLogicify%2FProjects&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   headerHooks: () => (/* binding */ headerHooks),\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage),\n/* harmony export */   staticGenerationBailout: () => (/* binding */ staticGenerationBailout)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_sachin_Documents_LearnLogicify_Projects_app_api_courses_enrolled_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/courses/enrolled/route.ts */ \"(rsc)/./app/api/courses/enrolled/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/courses/enrolled/route\",\n        pathname: \"/api/courses/enrolled\",\n        filename: \"route\",\n        bundlePath: \"app/api/courses/enrolled/route\"\n    },\n    resolvedPagePath: \"/Users/sachin/Documents/LearnLogicify/Projects/app/api/courses/enrolled/route.ts\",\n    nextConfigOutput,\n    userland: _Users_sachin_Documents_LearnLogicify_Projects_app_api_courses_enrolled_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks, headerHooks, staticGenerationBailout } = routeModule;\nconst originalPathname = \"/api/courses/enrolled/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjb3Vyc2VzJTJGZW5yb2xsZWQlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmNvdXJzZXMlMkZlbnJvbGxlZCUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmNvdXJzZXMlMkZlbnJvbGxlZCUyRnJvdXRlLnRzJmFwcERpcj0lMkZVc2VycyUyRnNhY2hpbiUyRkRvY3VtZW50cyUyRkxlYXJuTG9naWNpZnklMkZQcm9qZWN0cyUyRmFwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9JTJGVXNlcnMlMkZzYWNoaW4lMkZEb2N1bWVudHMlMkZMZWFybkxvZ2ljaWZ5JTJGUHJvamVjdHMmaXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQXNHO0FBQ3ZDO0FBQ2M7QUFDZ0M7QUFDN0c7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGdIQUFtQjtBQUMzQztBQUNBLGNBQWMseUVBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSx1R0FBdUc7QUFDL0c7QUFDQTtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUM2Sjs7QUFFN0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2RpbmctcGxhdGZvcm0vP2YwN2UiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL3NhY2hpbi9Eb2N1bWVudHMvTGVhcm5Mb2dpY2lmeS9Qcm9qZWN0cy9hcHAvYXBpL2NvdXJzZXMvZW5yb2xsZWQvcm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2NvdXJzZXMvZW5yb2xsZWQvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9jb3Vyc2VzL2Vucm9sbGVkXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jb3Vyc2VzL2Vucm9sbGVkL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiL1VzZXJzL3NhY2hpbi9Eb2N1bWVudHMvTGVhcm5Mb2dpY2lmeS9Qcm9qZWN0cy9hcHAvYXBpL2NvdXJzZXMvZW5yb2xsZWQvcm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgaGVhZGVySG9va3MsIHN0YXRpY0dlbmVyYXRpb25CYWlsb3V0IH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvY291cnNlcy9lbnJvbGxlZC9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBoZWFkZXJIb29rcywgc3RhdGljR2VuZXJhdGlvbkJhaWxvdXQsIG9yaWdpbmFsUGF0aG5hbWUsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcourses%2Fenrolled%2Froute&page=%2Fapi%2Fcourses%2Fenrolled%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcourses%2Fenrolled%2Froute.ts&appDir=%2FUsers%2Fsachin%2FDocuments%2FLearnLogicify%2FProjects%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsachin%2FDocuments%2FLearnLogicify%2FProjects&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/courses/enrolled/route.ts":
/*!*******************************************!*\
  !*** ./app/api/courses/enrolled/route.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/web/exports/next-response */ \"(rsc)/./node_modules/next/dist/server/web/exports/next-response.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n\n\n\n\nasync function GET() {\n    try {\n        // Get the session\n        const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_3__.authOptions);\n        console.log(\"Session:\", session); // Debug log\n        if (!session?.user?.id) {\n            console.log(\"No session or user ID found\"); // Debug log\n            return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n                error: \"Unauthorized\"\n            }, {\n                status: 401\n            });\n        }\n        // Find enrolled courses directly using the user ID from the session\n        const enrolledCourses = await _lib_prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.enrollment.findMany({\n            where: {\n                userId: session.user.id\n            },\n            include: {\n                course: {\n                    include: {\n                        instructor: {\n                            select: {\n                                id: true,\n                                name: true,\n                                image: true\n                            }\n                        }\n                    }\n                }\n            }\n        });\n        console.log(\"Enrolled courses:\", enrolledCourses); // Debug log\n        // Process enrollments\n        const processedCourses = enrolledCourses.map((enrollment)=>{\n            const course = enrollment.course;\n            return {\n                ...course,\n                enrollmentStatus: \"enrolled\",\n                progress: enrollment.progress,\n                lastAccessed: enrollment.lastAccessed?.toISOString() || null,\n                status: enrollment.status,\n                enrolledAt: enrollment.enrolledAt.toISOString(),\n                completedLessons: enrollment.completedLessons\n            };\n        });\n        // Return all courses in a flat array\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json(processedCourses);\n    } catch (error) {\n        console.error(\"Detailed error:\", error); // Debug log\n        return next_dist_server_web_exports_next_response__WEBPACK_IMPORTED_MODULE_0__[\"default\"].json({\n            error: error instanceof Error ? error.message : \"Failed to fetch enrolled courses\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NvdXJzZXMvZW5yb2xsZWQvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTJDO0FBQ0U7QUFDUDtBQUNHO0FBb0RsQyxlQUFlSTtJQUNwQixJQUFJO1FBQ0Ysa0JBQWtCO1FBQ2xCLE1BQU1DLFVBQVUsTUFBTUosMkRBQWdCQSxDQUFDRSxrREFBV0E7UUFDbERHLFFBQVFDLEdBQUcsQ0FBQyxZQUFZRixVQUFVLFlBQVk7UUFFOUMsSUFBSSxDQUFDQSxTQUFTRyxNQUFNQyxJQUFJO1lBQ3RCSCxRQUFRQyxHQUFHLENBQUMsZ0NBQWdDLFlBQVk7WUFDeEQsT0FBT1Asa0ZBQVlBLENBQUNVLElBQUksQ0FDdEI7Z0JBQUVDLE9BQU87WUFBZSxHQUN4QjtnQkFBRUMsUUFBUTtZQUFJO1FBRWxCO1FBRUEsb0VBQW9FO1FBQ3BFLE1BQU1DLGtCQUFrQixNQUFNWCwrQ0FBTUEsQ0FBQ1ksVUFBVSxDQUFDQyxRQUFRLENBQUM7WUFDdkRDLE9BQU87Z0JBQ0xDLFFBQVFaLFFBQVFHLElBQUksQ0FBQ0MsRUFBRTtZQUN6QjtZQUNBUyxTQUFTO2dCQUNQQyxRQUFRO29CQUNORCxTQUFTO3dCQUNQRSxZQUFZOzRCQUNWQyxRQUFRO2dDQUNOWixJQUFJO2dDQUNKYSxNQUFNO2dDQUNOQyxPQUFPOzRCQUNUO3dCQUNGO29CQUNGO2dCQUNGO1lBQ0Y7UUFDRjtRQUNBakIsUUFBUUMsR0FBRyxDQUFDLHFCQUFxQk0sa0JBQWtCLFlBQVk7UUFFL0Qsc0JBQXNCO1FBQ3RCLE1BQU1XLG1CQUFtQlgsZ0JBQWdCWSxHQUFHLENBQUNYLENBQUFBO1lBQzNDLE1BQU1LLFNBQVNMLFdBQVdLLE1BQU07WUFDaEMsT0FBTztnQkFDTCxHQUFHQSxNQUFNO2dCQUNUTyxrQkFBa0I7Z0JBQ2xCQyxVQUFVYixXQUFXYSxRQUFRO2dCQUM3QkMsY0FBY2QsV0FBV2MsWUFBWSxFQUFFQyxpQkFBaUI7Z0JBQ3hEakIsUUFBUUUsV0FBV0YsTUFBTTtnQkFDekJrQixZQUFZaEIsV0FBV2dCLFVBQVUsQ0FBQ0QsV0FBVztnQkFDN0NFLGtCQUFrQmpCLFdBQVdpQixnQkFBZ0I7WUFDL0M7UUFDRjtRQUVBLHFDQUFxQztRQUNyQyxPQUFPL0Isa0ZBQVlBLENBQUNVLElBQUksQ0FBQ2M7SUFDM0IsRUFBRSxPQUFPYixPQUFPO1FBQ2RMLFFBQVFLLEtBQUssQ0FBQyxtQkFBbUJBLFFBQVEsWUFBWTtRQUNyRCxPQUFPWCxrRkFBWUEsQ0FBQ1UsSUFBSSxDQUN0QjtZQUFFQyxPQUFPQSxpQkFBaUJxQixRQUFRckIsTUFBTXNCLE9BQU8sR0FBRztRQUFtQyxHQUNyRjtZQUFFckIsUUFBUTtRQUFJO0lBRWxCO0FBQ0YiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2RpbmctcGxhdGZvcm0vLi9hcHAvYXBpL2NvdXJzZXMvZW5yb2xsZWQvcm91dGUudHM/OGU0ZSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcic7XG5pbXBvcnQgeyBnZXRTZXJ2ZXJTZXNzaW9uIH0gZnJvbSAnbmV4dC1hdXRoJztcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gJ0AvbGliL3ByaXNtYSc7XG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gJ0AvbGliL2F1dGgnO1xuXG5pbnRlcmZhY2UgSW5zdHJ1Y3RvciB7XG4gIGlkOiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZyB8IG51bGw7XG4gIGltYWdlOiBzdHJpbmcgfCBudWxsO1xufVxuXG5pbnRlcmZhY2UgQ291cnNlV2l0aEluc3RydWN0b3Ige1xuICBpZDogc3RyaW5nO1xuICB0aXRsZTogc3RyaW5nO1xuICBkZXNjcmlwdGlvbjogc3RyaW5nO1xuICBpbnN0cnVjdG9ySWQ6IHN0cmluZztcbiAgaW5zdHJ1Y3RvcjogSW5zdHJ1Y3RvcjtcbiAgaW1hZ2U6IHN0cmluZztcbiAgcHJpY2U6IG51bWJlcjtcbiAgbGV2ZWw6IHN0cmluZztcbiAgZHVyYXRpb246IHN0cmluZztcbiAgbGVzc29uczogbnVtYmVyO1xuICByYXRpbmc6IG51bWJlcjtcbiAgc3R1ZGVudHM6IG51bWJlcjtcbiAgY2F0ZWdvcnk6IHN0cmluZztcbiAgdGFnczogc3RyaW5nW107XG4gIHN0YXJ0RGF0ZTogRGF0ZTtcbiAgZW5kRGF0ZTogRGF0ZTtcbiAgY3JlYXRlZEF0OiBEYXRlO1xuICB1cGRhdGVkQXQ6IERhdGU7XG59XG5cbmludGVyZmFjZSBFbnJvbGxtZW50V2l0aENvdXJzZSB7XG4gIGlkOiBzdHJpbmc7XG4gIHVzZXJJZDogc3RyaW5nO1xuICBjb3Vyc2VJZDogc3RyaW5nO1xuICBjb3Vyc2U6IENvdXJzZVdpdGhJbnN0cnVjdG9yO1xuICBlbnJvbGxlZEF0OiBEYXRlO1xuICBjb21wbGV0ZWRMZXNzb25zOiBudW1iZXJbXTtcbiAgcHJvZ3Jlc3M6IG51bWJlcjtcbiAgc3RhdHVzOiBzdHJpbmc7XG4gIGxhc3RBY2Nlc3NlZDogRGF0ZSB8IG51bGw7XG4gIGNyZWF0ZWRBdDogRGF0ZTtcbiAgdXBkYXRlZEF0OiBEYXRlO1xufVxuXG5pbnRlcmZhY2UgUHJvY2Vzc2VkQ291cnNlIGV4dGVuZHMgQ291cnNlV2l0aEluc3RydWN0b3Ige1xuICBlbnJvbGxtZW50U3RhdHVzOiAnZW5yb2xsZWQnO1xuICBwcm9ncmVzczogbnVtYmVyO1xuICBsYXN0QWNjZXNzZWQ6IHN0cmluZyB8IG51bGw7XG4gIHN0YXR1czogc3RyaW5nO1xuICBlbnJvbGxlZEF0OiBzdHJpbmc7XG4gIGNvbXBsZXRlZExlc3NvbnM6IG51bWJlcltdO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gR0VUKCkge1xuICB0cnkge1xuICAgIC8vIEdldCB0aGUgc2Vzc2lvblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBnZXRTZXJ2ZXJTZXNzaW9uKGF1dGhPcHRpb25zKTtcbiAgICBjb25zb2xlLmxvZygnU2Vzc2lvbjonLCBzZXNzaW9uKTsgLy8gRGVidWcgbG9nXG5cbiAgICBpZiAoIXNlc3Npb24/LnVzZXI/LmlkKSB7XG4gICAgICBjb25zb2xlLmxvZygnTm8gc2Vzc2lvbiBvciB1c2VyIElEIGZvdW5kJyk7IC8vIERlYnVnIGxvZ1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiAnVW5hdXRob3JpemVkJyB9LFxuICAgICAgICB7IHN0YXR1czogNDAxIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gRmluZCBlbnJvbGxlZCBjb3Vyc2VzIGRpcmVjdGx5IHVzaW5nIHRoZSB1c2VyIElEIGZyb20gdGhlIHNlc3Npb25cbiAgICBjb25zdCBlbnJvbGxlZENvdXJzZXMgPSBhd2FpdCBwcmlzbWEuZW5yb2xsbWVudC5maW5kTWFueSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICB1c2VySWQ6IHNlc3Npb24udXNlci5pZCxcbiAgICAgIH0sXG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIGNvdXJzZToge1xuICAgICAgICAgIGluY2x1ZGU6IHtcbiAgICAgICAgICAgIGluc3RydWN0b3I6IHtcbiAgICAgICAgICAgICAgc2VsZWN0OiB7XG4gICAgICAgICAgICAgICAgaWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgbmFtZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBpbWFnZTogdHJ1ZSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgY29uc29sZS5sb2coJ0Vucm9sbGVkIGNvdXJzZXM6JywgZW5yb2xsZWRDb3Vyc2VzKTsgLy8gRGVidWcgbG9nXG5cbiAgICAvLyBQcm9jZXNzIGVucm9sbG1lbnRzXG4gICAgY29uc3QgcHJvY2Vzc2VkQ291cnNlcyA9IGVucm9sbGVkQ291cnNlcy5tYXAoZW5yb2xsbWVudCA9PiB7XG4gICAgICBjb25zdCBjb3Vyc2UgPSBlbnJvbGxtZW50LmNvdXJzZTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmNvdXJzZSxcbiAgICAgICAgZW5yb2xsbWVudFN0YXR1czogJ2Vucm9sbGVkJyBhcyBjb25zdCxcbiAgICAgICAgcHJvZ3Jlc3M6IGVucm9sbG1lbnQucHJvZ3Jlc3MsXG4gICAgICAgIGxhc3RBY2Nlc3NlZDogZW5yb2xsbWVudC5sYXN0QWNjZXNzZWQ/LnRvSVNPU3RyaW5nKCkgfHwgbnVsbCxcbiAgICAgICAgc3RhdHVzOiBlbnJvbGxtZW50LnN0YXR1cyxcbiAgICAgICAgZW5yb2xsZWRBdDogZW5yb2xsbWVudC5lbnJvbGxlZEF0LnRvSVNPU3RyaW5nKCksXG4gICAgICAgIGNvbXBsZXRlZExlc3NvbnM6IGVucm9sbG1lbnQuY29tcGxldGVkTGVzc29ucyxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvLyBSZXR1cm4gYWxsIGNvdXJzZXMgaW4gYSBmbGF0IGFycmF5XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHByb2Nlc3NlZENvdXJzZXMpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ0RldGFpbGVkIGVycm9yOicsIGVycm9yKTsgLy8gRGVidWcgbG9nXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogZXJyb3IgaW5zdGFuY2VvZiBFcnJvciA/IGVycm9yLm1lc3NhZ2UgOiAnRmFpbGVkIHRvIGZldGNoIGVucm9sbGVkIGNvdXJzZXMnIH0sXG4gICAgICB7IHN0YXR1czogNTAwIH1cbiAgICApO1xuICB9XG59ICJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwicHJpc21hIiwiYXV0aE9wdGlvbnMiLCJHRVQiLCJzZXNzaW9uIiwiY29uc29sZSIsImxvZyIsInVzZXIiLCJpZCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImVucm9sbGVkQ291cnNlcyIsImVucm9sbG1lbnQiLCJmaW5kTWFueSIsIndoZXJlIiwidXNlcklkIiwiaW5jbHVkZSIsImNvdXJzZSIsImluc3RydWN0b3IiLCJzZWxlY3QiLCJuYW1lIiwiaW1hZ2UiLCJwcm9jZXNzZWRDb3Vyc2VzIiwibWFwIiwiZW5yb2xsbWVudFN0YXR1cyIsInByb2dyZXNzIiwibGFzdEFjY2Vzc2VkIiwidG9JU09TdHJpbmciLCJlbnJvbGxlZEF0IiwiY29tcGxldGVkTGVzc29ucyIsIkVycm9yIiwibWVzc2FnZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/courses/enrolled/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/google */ \"(rsc)/./node_modules/next-auth/providers/google.js\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var _auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @auth/prisma-adapter */ \"(rsc)/./node_modules/@auth/prisma-adapter/index.js\");\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! bcrypt */ \"bcrypt\");\n/* harmony import */ var bcrypt__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(bcrypt__WEBPACK_IMPORTED_MODULE_4__);\n\n\n\n\n\nconst authOptions = {\n    adapter: (0,_auth_prisma_adapter__WEBPACK_IMPORTED_MODULE_2__.PrismaAdapter)(_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma),\n    providers: [\n        (0,next_auth_providers_google__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            clientId: process.env.GOOGLE_CLIENT_ID || \"\",\n            clientSecret: process.env.GOOGLE_CLIENT_SECRET || \"\"\n        }),\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Password\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) {\n                    throw new Error(\"Invalid credentials\");\n                }\n                const user = await _prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user || !user.password) {\n                    throw new Error(\"User not found\");\n                }\n                const isPasswordValid = await bcrypt__WEBPACK_IMPORTED_MODULE_4___default().compare(credentials.password, user.password);\n                if (!isPasswordValid) {\n                    throw new Error(\"Invalid password\");\n                }\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    image: user.image\n                };\n            }\n        })\n    ],\n    callbacks: {\n        jwt: async ({ token, user })=>{\n            if (user) {\n                token.id = user.id;\n            }\n            return token;\n        },\n        session: async ({ session, token })=>{\n            if (session?.user) {\n                session.user.id = token.id;\n            }\n            return session;\n        }\n    },\n    session: {\n        strategy: \"jwt\"\n    },\n    pages: {\n        signIn: \"/auth/login\"\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQ3dEO0FBQ1U7QUFDYjtBQUNuQjtBQUNOO0FBYXJCLE1BQU1LLGNBQStCO0lBQzFDQyxTQUFTSixtRUFBYUEsQ0FBQ0MsMkNBQU1BO0lBQzdCSSxXQUFXO1FBQ1RQLHNFQUFjQSxDQUFDO1lBQ2JRLFVBQVVDLFFBQVFDLEdBQUcsQ0FBQ0MsZ0JBQWdCLElBQUk7WUFDMUNDLGNBQWNILFFBQVFDLEdBQUcsQ0FBQ0csb0JBQW9CLElBQUk7UUFDcEQ7UUFDQVosMkVBQW1CQSxDQUFDO1lBQ2xCYSxNQUFNO1lBQ05DLGFBQWE7Z0JBQ1hDLE9BQU87b0JBQUVDLE9BQU87b0JBQVNDLE1BQU07Z0JBQVE7Z0JBQ3ZDQyxVQUFVO29CQUFFRixPQUFPO29CQUFZQyxNQUFNO2dCQUFXO1lBQ2xEO1lBQ0EsTUFBTUUsV0FBVUwsV0FBVztnQkFDekIsSUFBSSxDQUFDQSxhQUFhQyxTQUFTLENBQUNELGFBQWFJLFVBQVU7b0JBQ2pELE1BQU0sSUFBSUUsTUFBTTtnQkFDbEI7Z0JBRUEsTUFBTUMsT0FBTyxNQUFNbkIsMkNBQU1BLENBQUNtQixJQUFJLENBQUNDLFVBQVUsQ0FBQztvQkFDeENDLE9BQU87d0JBQ0xSLE9BQU9ELFlBQVlDLEtBQUs7b0JBQzFCO2dCQUNGO2dCQUVBLElBQUksQ0FBQ00sUUFBUSxDQUFDQSxLQUFLSCxRQUFRLEVBQUU7b0JBQzNCLE1BQU0sSUFBSUUsTUFBTTtnQkFDbEI7Z0JBRUEsTUFBTUksa0JBQWtCLE1BQU1yQixxREFBYyxDQUMxQ1csWUFBWUksUUFBUSxFQUNwQkcsS0FBS0gsUUFBUTtnQkFHZixJQUFJLENBQUNNLGlCQUFpQjtvQkFDcEIsTUFBTSxJQUFJSixNQUFNO2dCQUNsQjtnQkFFQSxPQUFPO29CQUNMTSxJQUFJTCxLQUFLSyxFQUFFO29CQUNYWCxPQUFPTSxLQUFLTixLQUFLO29CQUNqQkYsTUFBTVEsS0FBS1IsSUFBSTtvQkFDZmMsT0FBT04sS0FBS00sS0FBSztnQkFDbkI7WUFDRjtRQUNGO0tBQ0Q7SUFDREMsV0FBVztRQUNUQyxLQUFLLE9BQU8sRUFBRUMsS0FBSyxFQUFFVCxJQUFJLEVBQUU7WUFDekIsSUFBSUEsTUFBTTtnQkFDUlMsTUFBTUosRUFBRSxHQUFHTCxLQUFLSyxFQUFFO1lBQ3BCO1lBQ0EsT0FBT0k7UUFDVDtRQUNBQyxTQUFTLE9BQU8sRUFBRUEsT0FBTyxFQUFFRCxLQUFLLEVBQUU7WUFDaEMsSUFBSUMsU0FBU1YsTUFBTTtnQkFDakJVLFFBQVFWLElBQUksQ0FBQ0ssRUFBRSxHQUFHSSxNQUFNSixFQUFFO1lBQzVCO1lBQ0EsT0FBT0s7UUFDVDtJQUNGO0lBQ0FBLFNBQVM7UUFDUEMsVUFBVTtJQUNaO0lBQ0FDLE9BQU87UUFDTEMsUUFBUTtJQUNWO0lBQ0FDLFFBQVEzQixRQUFRQyxHQUFHLENBQUMyQixlQUFlO0FBQ3JDLEVBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2RpbmctcGxhdGZvcm0vLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRBdXRoT3B0aW9ucyB9IGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgR29vZ2xlUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9nb29nbGUnO1xuaW1wb3J0IENyZWRlbnRpYWxzUHJvdmlkZXIgZnJvbSAnbmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFscyc7XG5pbXBvcnQgeyBQcmlzbWFBZGFwdGVyIH0gZnJvbSAnQGF1dGgvcHJpc21hLWFkYXB0ZXInO1xuaW1wb3J0IHsgcHJpc21hIH0gZnJvbSAnLi9wcmlzbWEnO1xuaW1wb3J0IGJjcnlwdCBmcm9tICdiY3J5cHQnO1xuXG5kZWNsYXJlIG1vZHVsZSAnbmV4dC1hdXRoJyB7XG4gIGludGVyZmFjZSBTZXNzaW9uIHtcbiAgICB1c2VyOiB7XG4gICAgICBpZDogc3RyaW5nO1xuICAgICAgbmFtZT86IHN0cmluZyB8IG51bGw7XG4gICAgICBlbWFpbD86IHN0cmluZyB8IG51bGw7XG4gICAgICBpbWFnZT86IHN0cmluZyB8IG51bGw7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBhdXRoT3B0aW9uczogTmV4dEF1dGhPcHRpb25zID0ge1xuICBhZGFwdGVyOiBQcmlzbWFBZGFwdGVyKHByaXNtYSksXG4gIHByb3ZpZGVyczogW1xuICAgIEdvb2dsZVByb3ZpZGVyKHtcbiAgICAgIGNsaWVudElkOiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX0lEIHx8ICcnLFxuICAgICAgY2xpZW50U2VjcmV0OiBwcm9jZXNzLmVudi5HT09HTEVfQ0xJRU5UX1NFQ1JFVCB8fCAnJyxcbiAgICB9KSxcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIG5hbWU6ICdjcmVkZW50aWFscycsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogJ0VtYWlsJywgdHlwZTogJ2VtYWlsJyB9LFxuICAgICAgICBwYXNzd29yZDogeyBsYWJlbDogJ1Bhc3N3b3JkJywgdHlwZTogJ3Bhc3N3b3JkJyB9XG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3JlZGVudGlhbHMnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHVzZXIgPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICB3aGVyZToge1xuICAgICAgICAgICAgZW1haWw6IGNyZWRlbnRpYWxzLmVtYWlsXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXVzZXIgfHwgIXVzZXIucGFzc3dvcmQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VzZXIgbm90IGZvdW5kJyk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpc1Bhc3N3b3JkVmFsaWQgPSBhd2FpdCBiY3J5cHQuY29tcGFyZShcbiAgICAgICAgICBjcmVkZW50aWFscy5wYXNzd29yZCxcbiAgICAgICAgICB1c2VyLnBhc3N3b3JkXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKCFpc1Bhc3N3b3JkVmFsaWQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcGFzc3dvcmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIGltYWdlOiB1c2VyLmltYWdlLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIGNhbGxiYWNrczoge1xuICAgIGp3dDogYXN5bmMgKHsgdG9rZW4sIHVzZXIgfSkgPT4ge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRva2VuO1xuICAgIH0sXG4gICAgc2Vzc2lvbjogYXN5bmMgKHsgc2Vzc2lvbiwgdG9rZW4gfSkgPT4ge1xuICAgICAgaWYgKHNlc3Npb24/LnVzZXIpIHtcbiAgICAgICAgc2Vzc2lvbi51c2VyLmlkID0gdG9rZW4uaWQgYXMgc3RyaW5nO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlc3Npb247XG4gICAgfSxcbiAgfSxcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiAnand0JyxcbiAgfSxcbiAgcGFnZXM6IHtcbiAgICBzaWduSW46ICcvYXV0aC9sb2dpbicsXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufTsgIl0sIm5hbWVzIjpbIkdvb2dsZVByb3ZpZGVyIiwiQ3JlZGVudGlhbHNQcm92aWRlciIsIlByaXNtYUFkYXB0ZXIiLCJwcmlzbWEiLCJiY3J5cHQiLCJhdXRoT3B0aW9ucyIsImFkYXB0ZXIiLCJwcm92aWRlcnMiLCJjbGllbnRJZCIsInByb2Nlc3MiLCJlbnYiLCJHT09HTEVfQ0xJRU5UX0lEIiwiY2xpZW50U2VjcmV0IiwiR09PR0xFX0NMSUVOVF9TRUNSRVQiLCJuYW1lIiwiY3JlZGVudGlhbHMiLCJlbWFpbCIsImxhYmVsIiwidHlwZSIsInBhc3N3b3JkIiwiYXV0aG9yaXplIiwiRXJyb3IiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNQYXNzd29yZFZhbGlkIiwiY29tcGFyZSIsImlkIiwiaW1hZ2UiLCJjYWxsYmFja3MiLCJqd3QiLCJ0b2tlbiIsInNlc3Npb24iLCJzdHJhdGVneSIsInBhZ2VzIiwic2lnbkluIiwic2VjcmV0IiwiTkVYVEFVVEhfU0VDUkVUIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst prismaClientSingleton = ()=>{\n    return new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\n};\nconst prisma = globalThis.prisma ?? prismaClientSingleton();\nif (true) {\n    globalThis.prisma = prisma;\n}\n\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyx3QkFBd0I7SUFDNUIsT0FBTyxJQUFJRCx3REFBWUE7QUFDekI7QUFNQSxNQUFNRSxTQUFTQyxXQUFXRCxNQUFNLElBQUlEO0FBRXBDLElBQUlHLElBQXlCLEVBQWM7SUFDekNELFdBQVdELE1BQU0sR0FBR0E7QUFDdEI7QUFFa0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jb2RpbmctcGxhdGZvcm0vLi9saWIvcHJpc21hLnRzPzk4MjIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJpc21hQ2xpZW50IH0gZnJvbSAnQHByaXNtYS9jbGllbnQnO1xuXG5jb25zdCBwcmlzbWFDbGllbnRTaW5nbGV0b24gPSAoKSA9PiB7XG4gIHJldHVybiBuZXcgUHJpc21hQ2xpZW50KCk7XG59O1xuXG5kZWNsYXJlIGdsb2JhbCB7XG4gIHZhciBwcmlzbWE6IHVuZGVmaW5lZCB8IFJldHVyblR5cGU8dHlwZW9mIHByaXNtYUNsaWVudFNpbmdsZXRvbj47XG59XG5cbmNvbnN0IHByaXNtYSA9IGdsb2JhbFRoaXMucHJpc21hID8/IHByaXNtYUNsaWVudFNpbmdsZXRvbigpO1xuXG5pZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICdwcm9kdWN0aW9uJykge1xuICBnbG9iYWxUaGlzLnByaXNtYSA9IHByaXNtYTtcbn1cblxuZXhwb3J0IHsgcHJpc21hIH07ICJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJwcmlzbWFDbGllbnRTaW5nbGV0b24iLCJwcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/openid-client","vendor-chunks/@babel","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/preact-render-to-string","vendor-chunks/@auth","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/lru-cache","vendor-chunks/oidc-token-hash","vendor-chunks/@panva"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcourses%2Fenrolled%2Froute&page=%2Fapi%2Fcourses%2Fenrolled%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcourses%2Fenrolled%2Froute.ts&appDir=%2FUsers%2Fsachin%2FDocuments%2FLearnLogicify%2FProjects%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fsachin%2FDocuments%2FLearnLogicify%2FProjects&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();