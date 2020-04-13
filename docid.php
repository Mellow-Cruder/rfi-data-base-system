public function update(){
        
    if($this->id) {        
        
        $stmt = $this->conn->prepare("
        UPDATE ".$this->documentTable."
        SET patient_id = ?, department_id= ?, admin2_id_id = ?, consultancy_fee = ?, document_ID = ?, document_ref = ?, status = ?
        WHERE id = ?");
 
        $this->id = htmlspecialchars(strip_tags($this->id));            
        $this->admin2_id_id = htmlspecialchars(strip_tags($this->admin2_id_id));
        $this->department_id = htmlspecialchars(strip_tags($this->department_id));
        $this->fee = htmlspecialchars(strip_tags($this->fee));
        $this->document_ID = htmlspecialchars(strip_tags($this->document_ID));
        $this->document_ref = htmlspecialchars(strip_tags($this->document_ref));
        $this->status = htmlspecialchars(strip_tags($this->status));            
        
        $stmt->bind_param("iiiisssi", $_SESSION["userid"], $this->department_id, $this->admin2_id_id, $this->fee, $this->document_ID, $this->document_ref, $this->status, $this->id);
        
        if($stmt->execute()){
            return true;
        }
        
    }    
}

