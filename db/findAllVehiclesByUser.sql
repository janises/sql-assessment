select make, model, year 
from users
left join vehicles
on users.id = vehicles.owner_id
where email = $1;