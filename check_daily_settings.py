#!/usr/bin/env python3
# -*- coding:utf-8 -*-
import sqlite3
import sys
import os

def check_database(db_path):
    print(f"Checking database: {db_path}")
    
    if not os.path.exists(db_path):
        print(f"Database file not found: {db_path}")
        return
    
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        
        # テーブル一覧を取得
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        print(f"Tables found: {[table[0] for table in tables]}")
        
        # daily_content_settingsテーブルが存在するかチェック
        table_exists = any('daily_content_settings' in table[0] for table in tables)
        
        if table_exists:
            print("\n=== daily_content_settings table found ===")
            cursor.execute("SELECT * FROM daily_content_settings;")
            rows = cursor.fetchall()
            
            # カラム名を取得
            cursor.execute("PRAGMA table_info(daily_content_settings);")
            columns = cursor.fetchall()
            column_names = [col[1] for col in columns]
            print(f"Columns: {column_names}")
            
            print(f"\nData rows: {len(rows)}")
            for row in rows:
                print(f"Guild: {row[0]}")
                for i, value in enumerate(row):
                    if i < len(column_names):
                        print(f"  {column_names[i]}: {value}")
                print("---")
        else:
            print("daily_content_settings table not found in this database")
        
        conn.close()
        
    except Exception as e:
        print(f"Error checking database: {e}")

# メインチェック
db_paths = [
    "/mnt/c/zeroone_support/bot_data.db",
    "/mnt/c/zeroone_support/weekly_content.db",
    "/mnt/c/zeroone_support/daily_content.db"
]

for db_path in db_paths:
    check_database(db_path)
    print("=" * 50)