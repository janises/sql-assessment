update vehicles
set owner_id = null
where id = $2
and owner_id = $1
returning vehicles.*;