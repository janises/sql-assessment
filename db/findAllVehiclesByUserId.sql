select make, year, model, vehicles.id, vehicles.owner_id
from users
left join vehicles
on users.id = vehicles.owner_id
where users.id = $1;