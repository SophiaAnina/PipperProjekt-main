<?php 
    require "../.env";

    header("Access-Control-Allow-Origin: *"); 
    header("Content-Type: application/json; charset=UTF-8"); 
    header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE"); 
    header("Access-Control-Max-Age: 3600"); 
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"); 
    
    $requestMethod = $_SERVER['REQUEST_METHOD'];
    $password = getenv("PASSWORD");
    $servername = "localhost:3306";
    $username = "root";

    $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    $uri = explode('/', $uri);
    $conn = new PDO("mysql:host=$servername;dbname=pipper", $username, $password);
    // set the PDO error mode to exception
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
   
    //Den går igennem et if-statement
    if ($requestMethod == "GET" && $uri[1] == "pipper") {
        try {
            $statement = $conn->query("SELECT * FROM pipper");
             
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);

            echo json_encode($result);

        } catch(PDOException $e) {
        echo "Connection failed: " . $e->getMessage();
        }
    }
    // Går i gennem server og giver et input hvis rigtig
    else if ($requestMethod == "POST" && $uri[1] == "pipper") {
        $input = (array) json_decode(file_get_contents('php://input'), true);
        // echo json_encode($input);

      //Går igennem inputtet som personen har givet
        if (isset($input['Brugernavn']) && trim($input['Brugernavn'], " ") != "") 
        {
           if (isset($input['Avatar']) && trim($input['Avatar'], " ") != "") 
           {
            if (isset($input['Besked']) && trim($input['Besked'], " ") != "") 
            { // server side validering
                if (isset($input['Dato']) && trim($input['Dato'], " ") != "") 
                {
                    $data = [
                        'Brugernavn' => $input['Brugernavn'],
                        'Avatar' => $input['Avatar'],
                        'Besked' => $input['Besked'],
                        'Dato' => $input['Dato'],
                        
                    ];
            
                    $sql = 'INSERT INTO pipper VALUES(default, :Brugernavn, :Besked, :Dato, :Avatar)';
                    $statement = $conn->prepare($sql);
                    $statement->execute($data);

                    $id = $conn->lastInsertId();
                    $pipper = (object) $input;
                    $pipper->id = $id;
                    echo json_encode($pipper);
                }
            }
            else {
                echo json_encode(["error" => "You need to write something!"]);
            }
        } else {
            echo json_encode(["error" => "Missing Avatar!"]);
        }
       } else {
           echo json_encode(["error" => "Missing Username!"]);
       }
        // kun gør ovenstående hvis $input['name'] er udfyldt OG ikke er tom
    }

    // echo $password; 
?> 