<?php
    include 'connect.php';
    $port = isset($_POST['port']) ? $_POST['port']:'';
    $uname = isset($_POST['phone']) ? $_POST['phone'] : '';
    $upsd = isset($_POST['psd']) ? $_POST['psd'] : '';
    if($port == 'verifyUserName'){
        $sql = "SELECT * FROM reg_log WHERE uname = '$uname'";
        $res = $conn->query($sql);
        if($res->num_rows){
            $code = 1;
            $message = '用户已被注册';
        }else{
            $code = 0;
            $message = '可以注册该用户';
        }
        $datalist = array(
            'code' => $code,
            'message' => $message
        ); 
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
        $res->close();
    }    
    if($port == 'reg'){
        $sql = "INSERT INTO reg_log (uname,upsd) VALUES('$uname','$upsd')";
        $res = $conn->query($sql);
        if($res){   //注册成功 输出1
          $code = 1;
          $message = '注册成功';
          $sql_2='CREATE TABLE `'.$uname.'@booku.com` (id varchar(255) ,Qty int ,price varchar(255),title varchar(255),imgurl varchar(255) ,market varchar(255) )';
          $conn->query($sql_2);
        }else{
          $code = 0; //注册失败 输出0
          $message = '注册失败';
        }
        $datalist = array(
            'code' => $code,
            'message' => $message
        );
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
    }
    if($port == 'login'){
        $sql = "SELECT * FROM reg_log WHERE uname = '$uname' AND upsd = '$upsd'";
        $res = $conn->query($sql);
        if($res->num_rows){
            $code = 1;
            $message = '登录成功';
        }else{
            $code = 0;
            $message = '登录失败';
        }
        $datalist = array(
            'uname' => $uname, //返回用户名  
            'code' => $code,
            'message' => $message
        );
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
        $res->close();
    }
?>