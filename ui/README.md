# Introduction

## Overview

Scaneo integrates with SpatioTemporal Asset Catalog (STAC), offering a swift and dependable method for labeling satellite imagery, aiding users in managing, categorizing, and annotating satellite images with a user-friendly interface.

## Purpose

This documentation aims to guide users through the installation, setup, and operational procedures of Scaneo.

# Getting Started

## Installation

```shell
pip install scaneo
```

## Initial Setup

Upon launching Scaneo, specify the directory containing the source images.
FLAGS PARA LA CLI
CLOUD BUCKET

# User Interface

## Label Selector

Label Interaction: Engage with existing labels or create new ones with associated colors.
Label Display: If an image has previously been labeled, the chosen label will be prominently displayed next to the label name.

## Quick Selection

Navigation: Shift between images swiftly with a comprehensive boundary view.
Image Retrieval: Obtain images by directly clicking on their boundaries or by using the search function.

## Classification

Assign labels to selected images through a toggling mechanism.

## Segmentation

Determine and designate areas of interest correlated with specific labels using brush and eraser tools.

## Detection

Highlight rectangular areas of interest.

## SAM (Segment Anything Model)

Utilize marker prompts to isolate regions of interest.

## Options

Configure image band specifications, define selection ranges, and adjust the opacity of highlighted areas.

# Images

Ensure your images are in TIF format. Define specific bands and ranges for visualization within Scaneo.

# Saving and Exporting

Labeling data is stored in a GeoJson format, encapsulating varied labeling tasks within a single image file while maintaining distinct data for each.

# STAC Compatibility

## Label Storage

All labeling data can be stored in the STAC format.

## Metadata Management

Supply initial metadata using STAC collection and label items.

# Troubleshooting and Support

## GPU Support

Ensure that pytorch is installed with GPU support.

## Contact

Provide details for user support and feedback here.

# Changelog

Document version history and updates to assist users in navigating and utilizing Scaneo effectively.
