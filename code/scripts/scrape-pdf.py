import re
import PyPDF2
import json

def clean_text(text):
  # Add a space at the end of each line to handle word wraps
  cleaned_text = re.sub(r'(?<!\.)\n', ' ', text).strip()
  return cleaned_text

def remove_header_n_footer(text):
  header_pattern = r"PRECIOUS BIBLE PROMISES; compiled by Samuel Clarke, D.D. \(1684-1759\) text\s\d+ of \d+"
  cleaned_text = re.sub(header_pattern, '', text)
  return cleaned_text

def extract_quoted_text_with_references(pdf_path, start_page, end_page):
  quoted_text_with_references = []
  quote_pattern = r'"(.*?)"?\s*\((.*?)\)'
  # quote_pattern = r'"(.*?)"\s*\((.*?)\)'
  section_pattern = r"(?<=\(Table of Contents\)).*?(?=\(Table of Contents\))"

  with open(pdf_path, 'rb') as file:
    pdf_reader = PyPDF2.PdfReader(file)
    total_pages = len(pdf_reader.pages)

    # Ensure start_page and end_page are within the valid range
    start_page = max(0, min(start_page, total_pages))
    end_page = max(start_page, min(end_page, total_pages))

    complete_text = ''

    for page_num in range(start_page, end_page):
      page = pdf_reader.pages[page_num]
      text = page.extract_text()

      text_no_header_n_footer = remove_header_n_footer(text)

      # print(text_no_header_n_footer)

      complete_text += text_no_header_n_footer

    # matches = re.findall(section_pattern, complete_text)

    # print(complete_text)

    complete_text_between_table_of_contents = re.findall(section_pattern, complete_text)

    filtered_sections = []
    for section in complete_text_between_table_of_contents:
        if re.search(quote_pattern, section):
            filtered_sections.append(section)
    complete_text_between_table_of_contents = filtered_sections

    indexer = 0

    for sub_category_id,section in enumerate(complete_text_between_table_of_contents):
      matches = re.findall(quote_pattern, section)
      for match in matches:
        quoted_text, references = match
        # cleaned_quoted_text = clean_text(quoted_text)
        entry_dict = {
           "id": indexer,
          "quote": quoted_text,
          # "quote": cleaned_quoted_text,
          "reference": references,
          "subCategoryId": sub_category_id
        }
        quoted_text_with_references.append(entry_dict)
        indexer += 1
      # print(f"\nsub_category_id: {sub_category_id} \nSection: {section}\n")

    print(quoted_text_with_references[143])

      # Find all occurrences of quoted text with references
    #   matches = re.findall(quote_pattern, text)
    #   for match in matches:
    #     quoted_text, references = match
    #     cleaned_quoted_text = clean_text(quoted_text)
    #     entry_string = f"Quote: {cleaned_quoted_text}\nReference: {references}\n--------\n"
    #     quoted_text_with_references.append(entry_string)

  # return text_no_header_n_footer
  return quoted_text_with_references


# if __name__ == "__main__":
pdf_file = "Clarkes_Bible_Promises_Tex.pdf"
start_page = 10
end_page = 141  # The range is exclusive, so we add 1 to include page 140
# end_page = 141  # The range is exclusive, so we add 1 to include page 140

extracted_quoted_text = extract_quoted_text_with_references(
  pdf_file, start_page, end_page)

# Write extracted_quoted_text to an output text file as an array literal
output_file = "output.json"
with open(output_file, "w") as file:
  json.dump(extracted_quoted_text, file, ensure_ascii=False)

for entry in extracted_quoted_text:
  print(entry)
