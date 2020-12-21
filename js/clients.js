metadata = [];
metadata_dict = {};

blocks_per_row = 3;
filters_per_row = 2;

block_column_class = "four";
filter_column_class = "six";

curr_filter_category = "All";
curr_filters = []

default_font_color = "#646468";
selected_font_color = "#123c5d";

const lookup_file_path = "../assets/data/clients_lookup.csv";
const tags_file_path = "../assets/data/clients_tags.csv";
const attribute_name = "client";
const img_folder = "Client"

createGlobals();
createDisplay(curr_filters, false);
createDrawer();














