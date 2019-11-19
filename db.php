<?php
$db = pg_connect("host=
ec2-54-221-195-148.compute-1.amazonaws.com port=5432 dbname=dfl13gsapbs6eq user=cdmmkudzyqqejx password=394f9537a711745c4746946825f0488eac1b7a3f428588a4c406645579ba7cf0");
$query = "INSERT INTO book VALUES ('$_POST[bookid]','$_POST[book_name]',
'$_POST[author]','$_POST[publisher]','$_POST[dop]',
'$_POST[price]')";
$result = pg_query($query); 
?>