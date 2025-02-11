from pandas import isna
from shapely.geometry import shape
import pystac


def convert_df_geom_to_shape(row):
    """
    Convert the geometry of a dataframe row to a shapely shape
    """
    if not isna(row["geometry"]):
        geo = shape(row["geometry"])
        wkt = geo.wkt
    else:
        wkt = "POLYGON EMPTY"

    return wkt


def get_all_children(obj: pystac.STACObject) -> list:
    """
    Get all the children of a STAC object
    """
    children = []
    # Append the current object to the list
    children.append(obj.to_dict())

    # Collections
    collections = list(obj.get_collections())
    for collection in collections:
        children.append(collection.to_dict())

    # Items
    items = obj.get_items()
    for item in items:
        children.append(item.to_dict())

    # Items from collections
    for collection in collections:
        items = collection.get_items()
        for item in items:
            children.append(item.to_dict())

    return children
