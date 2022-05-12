$(function(){
//comの出し手を1～9の整数値で判定する
let com =Math.floor(Math.random()*9)+1;
// p_s:Playerの出し手に数値を設定,p_s_l:Playerの出し手に文字を設定
// result:PlayervsComの結果の表示
// com_s:Comの出し手に数値を設定
// com_s_l:Comの出し手に文字を設定
// timer:setIntervalを設定するための変数
let p_s,p_s_l,result,com_s,com_s_l,timer;
// 1回目の勝負の時にPlayerの選択画面のカウントダウンの表示を5からスタートさせるために最初に6を設定
let limit=6;
// PlayerとComのwin/loseの表示を初期表示で0に設定
let p_win=0;
let p_lose=0;
let c_win=0;
let c_lose=0;

//start画面
$(".p_select").hide();
$("#result_move").hide();
//startボタンを押した後に「じゃん、けん…」画面に遷移
$(".start_btn").click(function(){
    alert("ほんの少しの暇つぶしとして使ってください！")
    $(".rule").hide();
    $(this).hide();
    $(".p_select").show();
    $(".resultmenu").hide();
    $("#main_title").hide();
//player側のカウントダウン開始
    $("#countdown").html(limit);
    countDown();
//カウントが0になった場合「何も選択されてないよ…」と表示される
    timer=setInterval(countDown,1000);
        function countDown(){
            limit--;
            $("#countdown").html(limit);
            if(limit===0){
                clearInterval(timer);
                p_s=null;
                p_s_l="何も選択されてないよ…"
                Result();
            }
        }
});
//「じゃん、けん…」画面のplayerの出し手
//playerの出しての定義
$(".janken").click(function(){
    //クリックしたボタンの表示をplayerという変数に入れる
    let player= $(this).html();
    if(player==="グー"){
        p_s=10;
        p_s_l="グー";
    }else if(player==="チョキ"){
        p_s=11;
        p_s_l="チョキ";
    }else if(player==="パー"){
        p_s=12;
        p_s_l="パー";
    }clearInterval(timer);
    Result();
});

//comの出し手の判定
ComRandom();

//「ぽん！」画面へ遷移
function Result(){
  if(p_win===3||c_win===3){
    $(".player").hide();
    $("#countdown").hide();
    setTimeout(function(){
        $("#jannkennpon").html("お疲れ様でした！結果は……");
    },500);
    //終了条件
    if(p_win===3){
        setTimeout(function(){
            $("#jannkennpon").html("おめでとう！！あなたの勝ちです。");
            $(".resultmenu").html("<button id='top_btn'>STARTに戻る</button>");
            $(".resultmenu").show();
            $(".r_com").hide();
            $(".r_player").hide();
            //リロードしてもう一度最初から
                $("#top_btn").click(function(){
                    location.reload();
                })
        },2000);
    }else if(c_win===3){
        setTimeout(function(){
            $("#jannkennpon").html("残念…。あなたの負けです。");
            $(".resultmenu").append("<button id='top_btn'>STARTに戻る</button>");
            $(".resultmenu").show();
            $(".r_com").hide();
            $(".r_player").hide();
            //リロードしてもう一度最初から
            $("#top_btn").click(function(){
                location.reload();
            })
        },2000);
    }
  }else{
    $("#jannkennpon").html("ぽん！");
    $("#countdown").hide();
    $(".player").hide();
    $(".resultmenu").show();
    $("#p_judge").html(p_s_l);
    $("#c_judge").html(com_s_l);
//1.5秒後に結果が表示される
    setTimeout(function(){
        if((p_s)-(com_s)===0){
            result ="あいこ！";
        }else if((p_s)-(com_s)===-1||(p_s)-(com_s)===2){
            result ="勝ち！";
        }else if((p_s)-(com_s)===-2||(p_s)-(com_s)===1||p_s===null){
            result ="負け！";
        }
        $("#jannkennpon").html(result);
        $(".resultmenu").append("<button class='next_btn'>次の勝負</button>");
//勝敗数の表示
        Countup();
//次の勝負ボタンを押したとき（2回目以降の勝負）
        $(".next_btn").click(function(){
            $(".next_btn").remove();
            com =Math.floor(Math.random()*9)+1;
            ComRandom();
            $(this).hide();
            $(".player").show();
            $(".resultmenu").hide();
            $("#jannkennpon").html("じゃん、けん...").show();
//player側のカウントダウン開始
            limit=6;
            $("#countdown").html(limit).show();
            countDown();
            timer=setInterval(countDown,1000);
                function countDown(){
                    limit--;
                    $("#countdown").html(limit);
                    if(limit===0){
                        clearInterval(timer);
                        p_s=null;
                        p_s_l="何も選択されてないよ…"
                        Result();
                    }
                }
        })
    },1500);
  }$("#top_btn").show();
}

//com側
// comの出しての定義
function ComRandom(){
    if(com>=1&&com<=3){
        com_s=10;
        com_s_l="グー";
    }else if(com>=4&&com<=6){
        com_s=11;
        com_s_l="チョキ";
    }else if(com>=7&&com<=9){
        com_s=12;
        com_s_l="パー";
    }
}
//カウントアップ
function Countup(){
    if(result==="勝ち！"){
    p_win++;
    c_lose++;
    $(".h_p").children("p:nth-child(2)").html(`win:${p_win}`);
    $(".h_c").children("p:nth-child(3)").html(`lose:${c_lose}`);
    }else if(result==="負け！"){
    p_lose++;
    c_win++;
    $(".h_p").children("p:nth-child(3)").html(`lose:${p_lose}`);
    $(".h_c").children("p:nth-child(2)").html(`win:${c_win}`);
    }
}
});
