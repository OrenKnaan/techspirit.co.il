import os
import re
import random

# Assuming the base content directory is blog/archive
# And optimized files go to blog/optimized

ARCHIVE_DIR = 'blog/archive'
OPTIMIZED_DIR = 'blog/optimized'

if not os.path.exists(OPTIMIZED_DIR):
    os.makedirs(OPTIMIZED_DIR)

def get_optimized_content(original_content, original_title):
    # This is a placeholder for the rewriting logic.
    
    # Simulate content transformation (changing title/slug is part of the file metadata)
    new_title = "מדריך מקצועי: " + original_title.replace('"', '').strip()
    new_slug = "optimized-" + str(random.randint(1000, 9999))
    
    optimized_content = f"""--- 
title: "{new_title}"
date: "2026-06-03"
slug: "{new_slug}"
categories: ['בלוג']
tags: ['אופטימיזציה', 'עסקים', 'טכנורוחני']
---

{original_content.split('---')[-1].strip()}

### שאלות ותשובות (FAQ)

1. שאלה 1?
תשובה 1.
2. שאלה 2?
תשובה 2.
3. שאלה 3?
תשובה 3.
4. שאלה 4?
תשובה 4.
5. שאלה 5?
תשובה 5.
6. שאלה 6?
תשובה 6.
7. שאלה 7?
תשובה 7.
8. שאלה 8?
תשובה 8.
9. שאלה 9?
תשובה 9.
10. שאלה 10?
תשובה 10.
"""
    return optimized_content

def process_files():
    for filename in os.listdir(ARCHIVE_DIR):
        if filename.endswith(".md"):
            filepath = os.path.join(ARCHIVE_DIR, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                
            # Extract title for placeholder transformation
            match = re.search(r'title: "(.*)"', content)
            title = match.group(1) if match else "פוסט ללא כותרת"
            
            optimized_content = get_optimized_content(content, title)
            
            optimized_filepath = os.path.join(OPTIMIZED_DIR, filename.replace(".md", "-optimized.md"))
            with open(optimized_filepath, 'w', encoding='utf-8') as f:
                f.write(optimized_content)
            print(f"Optimized: {filename}")

if __name__ == '__main__':
    process_files()
