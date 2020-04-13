The same code is reimplemented for every user_case
i.e The admin access as well as the access levels granted to all these individuals at a certain period/time

CREATE TABLE `rfid_log` (
  `id` int(11) NOT NULL,
  `document_id` int(11) NOT NULL,
  `chipset_id` int(11) NOT NULL,
  `admin_access_id` int(11) NOT NULL,
  Admin_login_id` int(25) NOT NULL,
  `document_name` int(11) NOT NULL,
  `document_accessLevel
  `Archive_set` varchar(255) NOT NULL
  `document_type` varchar(255) NOT NULL,
  `lastUpdate_time` varchar(255) NOT NULL,
  `lastedit_time` varchar(255) NOT NULL,
  `lastshared_time` varchar(255) NOT NULL,
  `created` datetime NOT NULL DEFAULT current_timestamp(),
  `status` enum('Active','Cancelled','Completed','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


