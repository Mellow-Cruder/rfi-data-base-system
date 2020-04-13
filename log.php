
$loginMessage = '';
if(!empty($_POST["login"]) && !empty($_POST["email"]) && !empty($_POST["password"]) && !empty($_POST["loginType"]) && $_POST["loginType"]) {    
    $user->email = $_POST["email"];
    $user->password = $_POST["password"];    
    $user->loginType = $_POST["loginType"];
    if($user->login()) {
        header("Location: dashboard.php");    
    } else {
        $loginMessage = 'Invalid login! password tries remaining 3.';
    }
} else {
    $loginMessage = 'Fill all fields.';
}


