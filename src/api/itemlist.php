<?php
    include 'connect.php';
    $port = isset($_POST['port']) ? $_POST['port']:'';
    $hot = isset($_GET['热度']) ? $_GET['热度'] : Null;
    $catagory = isset($_POST['类别']) ? $_POST['类别'] : Null;
    $press = isset($_POST['出版社']) ? $_POST['出版社'] : Null;
    $author = isset($_POST['作者']) ? $_POST['作者'] : Null;
    $uname = isset($_POST['phone']) ? $_POST['phone'] : '';
    $upsd = isset($_POST['psd']) ? $_POST['psd'] : '';
    $guid = isset($_POST['guid']) ? $_POST['guid'] : '';
    $mainid = isset($_POST['mainid']) ? $_POST['mainid'] : '';
    $url = isset($_POST['url']) ? $_POST['url'] : '';

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
        $sql1 = 'SELECT `类别`,`子类别id` FROM `bookuu` WHERE `类别` LIKE "%" LIMIT 0,1000';
        
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
        $result = $conn->query($sql2);
        $arr2 = $result->fetch_all(MYSQLI_ASSOC);
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
    $guid = isset($_POST['guid']) ? $_POST['guid']:'';
    if($port == 'findid'){
        $sql = "SELECT * FROM bookuu WHERE guid = '$guid'";
        $res = $conn->query($sql);
        $row = $res->fetch_all(MYSQLI_ASSOC);//得到数组

        echo json_encode($row,JSON_UNESCAPED_UNICODE);
        $res->close();
    };
    if($port == 'mainid'){
        $sql = "SELECT * FROM bookuu WHERE 子类别id = '$mainid'";
        $res = $conn->query($sql);
        $row = $res->fetch_all(MYSQLI_ASSOC);//得到数组

        echo json_encode($row,JSON_UNESCAPED_UNICODE);
        $res->close();
    };
    $goodnumber = isset($_POST['goodnumber']) ? $_POST['goodnumber']:'';
    $numberbox = isset($_POST['numberbox']) ? $_POST['numberbox']:'';
    $size = isset($_POST['size']) ? $_POST['size']:'';
    if($port == 'addCart'){
        $sql3 = "SELECT * FROM `bookuu` WHERE guid = '$guid'";
        $res3 = $conn->query($sql3);
        $row3 = $res3->fetch_all(MYSQLI_ASSOC);//得到数组
        // var_dump($row3[0]['id']); 获得商品id
        $price = $row3[0]['现价'];
        $market = $row3[0]['原价'];
        $title = $row3[0]['书名'];
        
        $sql = "SELECT * FROM `$uname@booku.com` WHERE id = '$guid'";
        $res = $conn->query($sql);
        if($res->num_rows){ //已有该商品
            $row = $res->fetch_all(MYSQLI_ASSOC); //获得数组
            $number = $row[0]['Qty'];
            if($numberbox == 'numberbox'){
                $num = $goodnumber;
            }else{
                $num = $number * 1 + $goodnumber * 1;
            }
            $sql4 = "UPDATE `$uname@booku.com` SET Qty = '$num' WHERE id = '$guid'";
            $res4 = $conn->query($sql4);
            
        }else{ 
            //购物车无该商品
            $sql2 = "INSERT INTO `$uname@booku.com` (id,Qty,price,imgurl,market,title) VALUES ('$guid','1','$price','$url','$market','$title')";
            $res2 = $conn->query($sql2);
        }
        $sql5 = "SELECT SUM(Qty) FROM `$uname@booku.com`"; //获取总的数量
        $res5 = $conn->query($sql5); //总的数量
        $row5 = $res5->fetch_all(MYSQLI_ASSOC);
        $allnum = $row5[0];
        //总价格
        $sql6 = "SELECT SUM(price * Qty) FROM `$uname@booku.com`";//总价格
        $res6 = $conn->query($sql6); 
        $row6 = $res6->fetch_all(MYSQLI_ASSOC);
        $allprice = $row6[0];
        

        //商品的数据
        $datalist = array(
                'allnum' => $allnum,
                'allprice' => $allprice
            );  
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
    };
    //购物车的商品数据
    if($port == 'cart'){
        $sql = "SELECT * FROM `$uname@booku.com`";
        $res = $conn->query($sql); 
        $row = $res->fetch_all(MYSQLI_ASSOC);
        //获取总的数量
        $sql5 = "SELECT SUM(Qty) FROM `$uname@booku.com`"; 
        $res5 = $conn->query($sql5); //总的数量
        $row5 = $res5->fetch_all(MYSQLI_ASSOC);
        $allnum = $row5[0];
        //总价格
        $sql6 = "SELECT SUM(price * Qty) FROM `$uname@booku.com`";//总价格
        $res6 = $conn->query($sql6); 
        $row6 = $res6->fetch_all(MYSQLI_ASSOC);
        $allprice = $row6[0];
        //集合数据
        $datalist = array(
                'data' => $row,
                'allnum' => $allnum,
                'allprice' => $allprice
            );      
        echo json_encode($datalist,JSON_UNESCAPED_UNICODE);
    };
    //购物车商品删除
    if($port == 'cartDel'){
        $sql = "DELETE FROM `$uname@booku.com` WHERE id = '$guid'";
        $res = $conn->query($sql);
        $conn->close();
    }
?>