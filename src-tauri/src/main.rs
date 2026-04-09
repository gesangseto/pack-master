// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[tauri::command]
fn shutdown() {
    std::process::Command::new("shutdown")
        .args(["/s", "/t", "0"])
        .spawn()
        .expect("failed to execute shutdown");
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_serialplugin::init())
        .plugin(tauri_plugin_sql::Builder::default().build())
        .invoke_handler(tauri::generate_handler![shutdown]) // 🔥 register di sini
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}