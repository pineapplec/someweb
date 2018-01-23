 <?php
 public function loginpass(){
        try{
            $user = M('Yguser');
            $data = $_POST;
            $userinfo = M('Yguser')->where(array('tel'=>$data['tel'],'password'=>md5($data['password']),'status'=>'1'))->find();
            if (!$userinfo) {
                $remsg['code'] = 3;
                throw new Exception("手机号或者密码错误");
            }
            if($userinfo['statu'] == 1){
                $remsg['code'] = 5;
                throw new Exception("该用户已经被禁用");
            }
            //生成token
            $token = md5(rand().time());
            $user->token = $token;
            $res = $user->where(array('tel'=>$data['tel'],'password'=>md5($data['password'])))->save();
            if (!$res) {
                $remsg['code'] = 4;
                throw new Exception("登陆失败");
            }
            //获取公钥
            $pkey = M('Config')->where(array('name'=>'PKEY'))->getField('value');
            $skey = M('Yguser')->where(array('tel'=>$data['tel'],'password'=>md5($data['password']),'status'=>'1'))->getField('skey');
            $remsg['code'] = 0;
            $remsg['msg'] = 'success';
            //登陆状态为1就是第一次登陆2：非第一次登陆
            $remsg['login_status'] = $userinfo['login_status'];
            $remsg['data'] = array('token'=>$token,'pkey'=>$pkey,'skey'=>$skey);
        }catch(Exception $e){
            $remsg['msg'] = $e->getMessage();
        }
        $arr = json_encode($remsg);
        echo $arr;
    }
?>