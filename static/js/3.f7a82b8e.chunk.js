(this["webpackJsonphello-react"]=this["webpackJsonphello-react"]||[]).push([[3],{292:function(e,t,a){"use strict";a.d(t,"a",(function(){return m}));var n=a(32),s=a(33),r=a(36),u=a(35),i=a(0),l=a.n(i),c=a(10),o=a(15),p=function(e){return{isAuth:e.auth.isAuth}},m=function(e){var t=function(t){Object(r.a)(i,t);var a=Object(u.a)(i);function i(){return Object(n.a)(this,i),a.apply(this,arguments)}return Object(s.a)(i,[{key:"render",value:function(){return this.props.isAuth?l.a.createElement(e,this.props):l.a.createElement(c.a,{to:"/login"})}}]),i}(l.a.Component);return Object(o.b)(p)(t)}},293:function(e,t,a){e.exports={wallImage:"avatarDescription_wallImage__19baP",avatar:"avatarDescription_avatar__2sWD7",discription:"avatarDescription_discription__2IFhU",statusUser:"avatarDescription_statusUser__cJfqa"}},294:function(e,t,a){e.exports={wall:"MyPosts_wall__1c8gn",addPost:"MyPosts_addPost__qj3M7"}},295:function(e,t,a){e.exports={item:"Post_item__ihtu9",text:"Post_text__3_Vii",like:"Post_like__oViQh"}},296:function(e,t,a){"use strict";a.r(t);var n=a(32),s=a(33),r=a(36),u=a(35),i=a(0),l=a.n(i),c=a(293),o=a.n(c),p=a(38),m=a(129),d=function(e){var t=Object(i.useState)(!1),a=Object(m.a)(t,2),n=a[0],s=a[1],r=Object(i.useState)(e.status),u=Object(m.a)(r,2),c=u[0],p=u[1];Object(i.useEffect)((function(){p(e.status)}),[e.status]);return l.a.createElement("div",null,!n&&l.a.createElement("div",null,l.a.createElement("span",{onDoubleClick:function(){s(!0)},className:o.a.statusUser},e.status||"no status...")),n&&l.a.createElement("div",null,l.a.createElement("input",{onChange:function(e){p(e.currentTarget.value)},value:c,autoFocus:!0,onBlur:function(){s(!1),e.updateStatus(c)}})))},f=function(e){return e.profile?l.a.createElement("div",null,l.a.createElement("div",{className:o.a.wallImage},l.a.createElement("img",{alt:"CuberPunk",src:"https://s1.1zoom.ru/big3/984/Canada_Parks_Lake_Mountains_Forests_Scenery_Rocky_567540_3840x2400.jpg"})),l.a.createElement("div",{className:o.a.avatar},l.a.createElement("img",{alt:"avatar",src:e.profile.photos.large}),l.a.createElement("div",{className:o.a.discription},l.a.createElement("div",{className:o.a.fullName},e.profile.fullName),l.a.createElement("div",null,l.a.createElement(d,{status:e.status,updateStatus:e.updateStatus})),l.a.createElement("div",{className:o.a.contactsUser},"\u0412 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435: ",e.profile.contacts.vk)))):l.a.createElement(p.a,null)},h=a(95),v=a(294),E=a.n(v),_=a(295),b=a.n(_),g=function(e){return l.a.createElement("div",{className:b.a.item},l.a.createElement("img",{src:"https://sun9-52.userapi.com/c851120/v851120160/19fa57/I2WRc_mpc9E.jpg",alt:""}),l.a.createElement("div",{className:b.a.text},e.message),l.a.createElement("div",{className:b.a.like},"Like ",e.like," "))},j=a(88),P=a(128),O=a(85),k=a(31),S=l.a.memo((function(e){console.log("render");var t=e.profilePage.postData.map((function(e){return l.a.createElement(g,{message:e.message,key:e.id,like:e.like})}));return l.a.createElement("div",{className:E.a.wall},l.a.createElement("div",{className:E.a.addPost},l.a.createElement("h3",null,"My Posts"),l.a.createElement(y,{onSubmit:function(t){return e.addPost(t.newPostText)}})),l.a.createElement("div",null,t))})),N=Object(O.a)(15),y=Object(P.a)({form:"addPost"})((function(e){return l.a.createElement("form",{onSubmit:e.handleSubmit},l.a.createElement("div",null,l.a.createElement(j.a,{validate:[O.b,N],component:k.b,name:"newPostText",placeholder:"Enter text..."})),l.a.createElement("div",null,l.a.createElement("button",null,"Add post")))})),w=S,x=a(15),D=Object(x.b)((function(e){return{profilePage:e.profilePage}}),(function(e){return{addPost:function(t){e(Object(h.a)(t))}}}))(w),I=function(e){return l.a.createElement("div",null,l.a.createElement(f,{profile:e.profile,status:e.status,updateStatus:e.updateStatus}),l.a.createElement(D,null))},U=a(10),A=a(292),C=a(8),M=function(e){Object(r.a)(a,e);var t=Object(u.a)(a);function a(){return Object(n.a)(this,a),t.apply(this,arguments)}return Object(s.a)(a,[{key:"componentDidMount",value:function(){var e=this.props.match.params.userID;e||(e=this.props.authorizedUserId)||this.props.history.push("/login"),this.props.getUserProfile(e),this.props.getStatus(e)}},{key:"render",value:function(){return l.a.createElement(I,Object.assign({},this.props,{profile:this.props.profile,status:this.props.status,updateStatus:this.props.updateStatus}))}}]),a}(l.a.Component);t.default=Object(C.d)(Object(x.b)((function(e){return{profile:e.profilePage.profile,status:e.profilePage.status,authorizedUserId:e.auth.userId,isAuth:e.auth.isAuth}}),{getUserProfile:h.d,getStatus:h.c,updateStatus:h.e}),U.f,A.a)(M)}}]);
//# sourceMappingURL=3.f7a82b8e.chunk.js.map