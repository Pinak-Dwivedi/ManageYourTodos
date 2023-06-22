"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[753],{753:function(e,r,a){a.r(r),a.d(r,{default:function(){return u}});var s=a(165),t=a(861),n=a(439),i=a(791),l=a(689),o=a(87),c=a(725),m=a(73),d=a(184);var u=function(){var e=(0,i.useState)(""),r=(0,n.Z)(e,2),a=r[0],u=r[1],p=(0,i.useState)(""),f=(0,n.Z)(p,2),g=f[0],h=f[1],x=(0,i.useState)(""),j=(0,n.Z)(x,2),v=j[0],N=j[1],b=(0,i.useState)(""),w=(0,n.Z)(b,2),y=w[0],P=w[1],Z=(0,i.useState)(),S=(0,n.Z)(Z,2),k=S[0],I=S[1],C=(0,i.useState)({}),E=(0,n.Z)(C,2),F=E[0],q=E[1],A=(0,i.useContext)(c.Z),U=A.setAuthUser,D=A.isAuthenticated,O=A.setIsAuthenticated,L=A.loading,R=A.setLoading,T=(0,l.s0)();if(D)return(0,d.jsx)(l.Fg,{to:"/dashboard"});function B(){return(B=(0,t.Z)((0,s.Z)().mark((function e(r){var t,n,i,l;return(0,s.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r.preventDefault(),(t=new FormData).append("name",a),t.append("email",g),t.append("password",v),t.append("confirmPassword",y),t.append("profileImage",k),R(!0),e.prev=8,e.next=11,fetch("".concat("https://manage-your-todos-backend.onrender.com","/users"),{method:"POST",credentials:"include",body:t});case 11:return n=e.sent,e.next=14,n.json();case 14:if(i=e.sent,q({}),i.success){e.next=18;break}throw i;case 18:O(!0),U(i.user),T("/dashboard"),R(!1),m.ZP.success(i.message),e.next=31;break;case 25:e.prev=25,e.t0=e.catch(8),O(!1),U({}),R(!1),"object"===typeof e.t0.error?(l={},e.t0.error.forEach((function(e){for(var r in e)l[r]=e[r][0]})),q(l)):"Only png|jpg|jpeg file formats are allowed"===e.t0.error?q({profileImage:"Only png|jpg|jpeg file formats are allowed"}):m.ZP.error(e.t0.error);case 31:case"end":return e.stop()}}),e,null,[[8,25]])})))).apply(this,arguments)}return(0,d.jsx)("div",{className:"register-container",children:(0,d.jsxs)("form",{className:"register-form",encType:"multipart/form-data",onSubmit:function(e){L?e.preventDefault():function(e){B.apply(this,arguments)}(e)},children:[(0,d.jsx)("div",{className:"register-heading",children:"Sign Up"}),(0,d.jsxs)("div",{className:"register-form-field",children:[(0,d.jsx)("label",{className:"register-form-label",htmlFor:"name",children:"Name"}),(0,d.jsx)("input",{className:"register-form-input",type:"text",id:"name",name:"text",placeholder:"Enter Name",value:a,required:!0,onChange:function(e){return u(e.target.value)}}),(0,d.jsx)("span",{className:"register-form-error",children:F.name})]}),(0,d.jsxs)("div",{className:"register-form-field",children:[(0,d.jsx)("label",{className:"register-form-label",htmlFor:"email",children:"Email address"}),(0,d.jsx)("input",{className:"register-form-input",type:"text",id:"email",name:"email",placeholder:"Enter Email",value:g,required:!0,onChange:function(e){return h(e.target.value)}}),(0,d.jsx)("span",{className:"register-form-error",children:F.email})]}),(0,d.jsxs)("div",{className:"register-form-field",children:[(0,d.jsx)("label",{className:"register-form-label",htmlFor:"password",children:"Password"}),(0,d.jsx)("input",{className:"register-form-input",type:"password",id:"password",name:"password",placeholder:"Enter Password",value:v,required:!0,onChange:function(e){return N(e.target.value)}}),(0,d.jsx)("span",{className:"register-form-error",children:F.password})]}),(0,d.jsxs)("div",{className:"register-form-field",children:[(0,d.jsx)("label",{className:"register-form-label",htmlFor:"confirmPassword",children:"Re-Enter Password"}),(0,d.jsx)("input",{className:"register-form-input",type:"password",id:"confirmPassword",name:"confirmPassword",placeholder:"Re-Enter Password",value:y,required:!0,onChange:function(e){return P(e.target.value)}}),(0,d.jsx)("span",{className:"register-form-error",children:F.confirmPassword})]}),(0,d.jsxs)("div",{className:"register-form-field",children:[(0,d.jsx)("label",{className:"register-form-label image-label",htmlFor:"profileImage",children:"Profile Image"}),(0,d.jsx)("input",{className:"register-form-input",type:"file",id:"profileImage",name:"profileImage",onChange:function(e){return I(e.target.files[0])}}),(0,d.jsx)("span",{className:"register-form-error",children:F.profileImage})]}),(0,d.jsx)("button",{className:"register-form-submitButton",type:"submit",children:"Sign Up"}),(0,d.jsxs)("div",{className:"already-have-account",children:["Already have an account? ",(0,d.jsx)(o.rU,{className:"already-have-account-link",to:"/login",children:"LogIn"})]})]})})}}}]);
//# sourceMappingURL=753.10c7de02.chunk.js.map