select make, model, year, users.name
from users
join vehicles
on users.id = vehicles.owner_id
where year > 2000
order by year desc;