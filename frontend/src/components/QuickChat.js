import React from 'react'
import $ from "jquery";

function QuickChat() {
  // Team chat 클릭 시 채팅방 뜨는 함수
  window.onload = function () {
    document
      .getElementsByClassName("quickmenu")[0]
      .addEventListener("click", function () {
        document
          .getElementsByClassName("chatroombox")[0]
          .classList.toggle("tcshow");
      });
  };

  // 우측 Teaam chat
  $(document).ready(function () {
    var currentPosition = parseInt($(".quickmenu").css("top"));
    $(window).scroll(function () {
      var position = $(window).scrollTop();
      $(".quickmenu")
        .stop()
        .animate({ top: position + currentPosition + "px" }, 1000);
    });
  });
  return (
    <>
      <div className="quickmenu chatBox">
        <p>
          Team Chat
          <i className="fas fa-comment"></i>
        </p>
      </div>
      {/* 누르면 채팅뜨는 box */}
      <div className="chatroombox">
        <h1 style={{ textAlign: "center" }}>채팅방</h1>
      </div>
    </>
  );
}

export default QuickChat