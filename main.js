$document_ID = new document_ID($db);

if(!empty($_POST['action']) && $_POST['action'] == 'Document_ID') {
    $document_ID->Document_ID();
}

We will implement the method Document_ID() from class document_ID.php and return records as JSON data.

public function Document_ID(){
        
    $sqlWhere = '';
    if($_SESSION["role"] == 'secretary') {
        $sqlWhere = "WHERE a.secretary_id = '".$_SESSION["userid"]."'";
    }    
$sqlQuery = "SELECT a.id, d.name as Admin2_name, s.Document_ref, a.Document_tag, document_ID_date, a.document_ID_time, a.created, a.status, p.name as secretary, p.id as secretary_id
        FROM ".$this->document_IDTable." a
        LEFT JOIN ".$this->Admin2Table." d ON a.Admin2_id = d.id
        LEFT JOIN ".$this->secretaryTable." p ON a.secretary_id = p.id
        LEFT JOIN ".$this->Document_refTable." s ON a.Document_ref_id = s.id $sqlWhere ";
        
        
    if(!empty($_POST["search"]["value"])){
        $sqlQuery .= ' AND (a.id LIKE "%'.$_POST["search"]["value"].'%" ';
        $sqlQuery .= ' OR d.name LIKE "%'.$_POST["search"]["value"].'%" ';            
        $sqlQuery .= ' OR s.Document_ref LIKE "%'.$_POST["search"]["value"].'%" ';
        $sqlQuery .= ' OR a.Document_tag LIKE "%'.$_POST["search"]["value"].'%" ';
        $sqlQuery .= ' OR a.document_ID_date LIKE "%'.$_POST["search"]["value"].'%" ';
        $sqlQuery .= ' OR a.document_ID_time LIKE "%'.$_POST["search"]["value"].'%") ';                    
    }
    if(!empty($_POST["order"])){
        $sqlQuery .= 'ORDER BY '.$_POST['order']['0']['column'].' '.$_POST['order']['0']['dir'].' ';
    } else {
        $sqlQuery .= 'ORDER BY a.id DESC ';
    }
    
    if($_POST["length"] != -1){
        $sqlQuery .= 'LIMIT ' . $_POST['start'] . ', ' . $_POST['length'];
    }        
    $stmt = $this->conn->prepare($sqlQuery);
    $stmt->execute();
    $result = $stmt->get_result();    
    
    $stmtTotal = $this->conn->prepare("SELECT * FROM ".$this->document_IDTable." as a $sqlWhere");
    $stmtTotal->execute();
    $allResult = $stmtTotal->get_result();
    $allRecords = $allResult->num_rows;
    
    $displayRecords = $result->num_rows;
    $records = array();        
    while ($document_ID = $result->fetch_assoc()) {   
$rows = array();            
        $rows[] = $document_ID['id'];
        $rows[] = ucfirst($document_ID['secretary']);
        $rows[] = ucfirst($document_ID['Admin2_name']);
        $rows[] = $document_ID['Document_ref'];
        $rows[] = $document_ID['Document_tag'];
        $rows[] = $document_ID['document_ID_time'];
        $rows[] = $document_ID['document_ID_date'];    
        $rows[] = $document_ID['status'];                    
        $rows[] = '<button type="button" name="view" id="'.$document_ID["id"].'" class="btn btn-info btn-xs view"><span class="glyphicon glyphicon-file" title="View"></span></button>';
        if($_SESSION["role"] == 'admin' || $_SESSION["role"] == 'patient') {
            $rows[] = '<button type="button" name="update" id="'.$document_ID["id"].'" class="btn btn-warning btn-xs update"><span class="glyphicon glyphicon-edit" title="Edit"></span></button>';
            $rows[] = '<button type="button" name="delete" id="'.$document_ID["id"].'" class="btn btn-danger btn-xs delete" ><span class="glyphicon glyphicon-remove" title="Delete"></span></button>';
        } else {
            $rows[] = '';
            $rows[] = '';
            $rows[] = '';
        }
        $records[] = $rows;
    }
    
    $output = array(
        "draw"    =>    intval($_POST["draw"]),            
        "iTotalRecords"    =>     $displayRecords,
        "iTotalDisplayRecords"    =>  $allRecords,
        "data"    =>     $records
    );
    
    echo json_encode($output);
