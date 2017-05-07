UPDATE Users SET (
    updated,
    title,
    first_name,
    last_name,
    institute_id,
    email_address,
    blocked
) = (
    now(),
    $2::TEXT,
    $3::TEXT,
    $4::TEXT,
    $5::INTEGER,
    $6::TEXT,
    $7::BOOLEAN
)
WHERE
    user_id=$1::INTEGER
RETURNING
    user_id
    created,
    updated,
    title,
    first_name,
    last_name,
    institute_id,
    email_address,
    blocked
;
