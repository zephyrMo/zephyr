<?php
    include 'connect.php';
    $hot = isset($_GET['热度']) ? $_GET['热度'] : Null;
    $catagory = isset($_POST['类别']) ? $_POST['类别'] : Null;
    $press = isset($_POST['出版社']) ? $_POST['出版社'] : Null;
    $author = isset($_POST['作者']) ? $_POST['作者'] : Null;
    if($hot){
        $sql = 'select * from bookuu where `热度`>'.$hot.' limit 12';
        //获取查询结果集
        $result = $conn->query($sql);
        //使用查询结果集
        //得到数组
        $arr = $result->fetch_all(MYSQLI_ASSOC);
        //释放查询结果集，避免资源浪费
        $result->close();
        //把结果输出到前台
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
        // print_r(json_encode($arr,JSON_UNESCAPED_UNICODE));

        // 关闭数据库，避免资源浪费
        $conn->close();
    };
    if($catagory == 'all'){
        $sql1 = 'SELECT `类别` FROM `bookuu` WHERE `类别` LIKE "%" LIMIT 0,1000';
        
        //获取查询结果集
        $result = $conn->query($sql1);
        //使用查询结果集
        //得到数组
        $arr1 = $result->fetch_all(MYSQLI_ASSOC);
        //释放查询结果集，避免资源浪费
        // $result->close();
        //把结果输出到前台
        // echo json_encode($arr,JSON_UNESCAPED_UNICODE);
        // 关闭数据库，避免资源浪费
        // $conn->close();
    };
    if($press == 'all'){
        $sql2 = 'SELECT `出版社` FROM `bookuu` WHERE `出版社` LIKE "%" LIMIT 0,10';
        
        //获取查询结果集
        $result = $conn->query($sql2);
        //使用查询结果集
        //得到数组
        $arr2 = $result->fetch_all(MYSQLI_ASSOC);
        //释放查询结果集，避免资源浪费
        // $result->close();
        //把结果输出到前台
        // echo json_encode($arr,JSON_UNESCAPED_UNICODE);
        // 关闭数据库，避免资源浪费
        // $conn->close();
    };
    if($author == 'all'){
        $sql3 = 'SELECT `作者` FROM `bookuu` WHERE `作者` LIKE "%" LIMIT 0,10';
        
        //获取查询结果集
        $result = $conn->query($sql3);
        //使用查询结果集
        //得到数组
        $arr3 = $result->fetch_all(MYSQLI_ASSOC);
        //释放查询结果集，避免资源浪费
        $result->close();
        //把结果输出到前台
        $res = array($arr1,$arr2,$arr3);
        echo json_encode($res,JSON_UNESCAPED_UNICODE);

        // echo json_encode($arr1,JSON_UNESCAPED_UNICODE),json_encode($arr2,JSON_UNESCAPED_UNICODE),json_encode($arr3,JSON_UNESCAPED_UNICODE);
        // 关闭数据库，避免资源浪费
        $conn->close();
    };

?>