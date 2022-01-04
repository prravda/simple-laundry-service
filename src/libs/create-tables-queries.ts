export const createTableQueries = `
CREATE TABLE IF NOT EXISTS users (
  uuid varchar(255) PRIMARY KEY,
  name varchar(255),
  nickname varchar(255),
  cell_phone_number varchar(255),
  gender varchar(255),
  default_address_id int,
  credential_id int,
  is_activated_user varchar(255),
  created_at timestamp,
  updated_at timestamp,
  deleted_at timestamp
);

CREATE TABLE IF NOT EXISTS credentials (
  id int PRIMARY KEY,
  refresh_token varchar(255),
  created_at timestamp,
  updated_at timestamp,
  FOREIGN KEY (id) REFERENCES users (credential_id)
);

CREATE TABLE IF NOT EXISTS address (
  id int PRIMARY KEY,
  address_line_one varchar(255),
  address_line_two varchar(255)
);

CREATE TABLE IF NOT EXISTS user_to_address (
  id int PRIMARY KEY,
  user_uuid varchar(255),
  address_id int,
  FOREIGN KEY (user_uuid) REFERENCES users (uuid),
  FOREIGN KEY (address_id) REFERENCES users (default_address_id),
  FOREIGN KEY (address_id) REFERENCES address (id),
  FOREIGN KEY (address_id) REFERENCES tasks (address_id)
);

CREATE TABLE IF NOT EXISTS tasks (
  id int PRIMARY KEY,
  user_uuid int,
  information_id int,
  mission_id int,
  address_id int,
  location varchar(255),
  FOREIGN KEY (user_uuid) REFERENCES users (uuid)
);

CREATE TABLE IF NOT EXISTS information (
  id int PRIMARY KEY,
  time_id int,
  FOREIGN KEY (id) REFERENCES tasks (information_id)
);

CREATE TABLE IF NOT EXISTS time (
  id int PRIMARY KEY,
  pickup timestamp,
  delivery timestamp,
  FOREIGN KEY (id) REFERENCES information (time_id)
);

CREATE TABLE IF NOT EXISTS missions (
  id int PRIMARY KEY,
  item_list_id int,
  FOREIGN KEY (id) REFERENCES tasks (mission_id)
);

CREATE TABLE IF NOT EXISTS items (
  id int PRIMARY KEY,
  name varchar(255),
  user_message varchar(255),
  tag_list_id int,
  representative_item_image varchar(255),
  image_list_id int
);

CREATE TABLE IF NOT EXISTS item_list_to_item (
  id int PRIMARY KEY,
  item_list_id int,
  item_id int,
  FOREIGN KEY (item_list_id) REFERENCES missions (item_list_id),
  FOREIGN KEY (item_id) REFERENCES items (id)
);

CREATE TABLE IF NOT EXISTS tags (
  id int PRIMARY KEY,
  name varchar(255)
);

CREATE TABLE IF NOT EXISTS tag_list_to_tag (
  id int PRIMARY KEY,
  tag_list_id int,
  tag_id int,
  FOREIGN KEY (tag_list_id) REFERENCES items (tag_list_id),
  FOREIGN KEY (tag_id) REFERENCES tags (id)
);

CREATE TABLE IF NOT EXISTS images (
  id int PRIMARY KEY,
  image_id varchar(255),
  image_url varchar(255)
);

CREATE TABLE IF NOT EXISTS item_to_image (
  id int PRIMARY KEY,
  image_list_id int,
  image_id int,
  FOREIGN KEY (image_list_id) REFERENCES items (image_list_id),
  FOREIGN KEY (image_id) REFERENCES images (id)
);`;
