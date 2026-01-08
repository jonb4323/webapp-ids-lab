#include <iostream>
#include <string>
#include <optional>
#include <nlohmann/json.hpp>

using json = nlohmann::json;

std::optional<json> parse_json_line(const std::string& line) {
    try {
        return json::parse(line);
    }
    catch (const std::exception& e) {
        std::cerr << "JSON parse error: " << e.what() << "\n";
        return std::nullopt;
    }
}

int main() {
    std::cout << "IDS started \n";

    // Example JSON line (hardcoded)
    std::string line = R"({"ts":"2026-01-06T12:00:01Z","ip":"1.2.3.4","event":"http_request"})";

    auto jopt = parse_json_line(line);
    if (!jopt) {
        std::cout << "Failed to parse JSON\n";
    }
    else {
        json j = *jopt;
        std::cout << "Parsed JSON:\n" << j.dump(2) << "\n";
        std::cout << "ip = " << j.value("ip", "(missing)") << "\n";
    }

    std::cout << "\nProgram finished. Press Enter to exit...\n";
    std::cin.get();
    return 0;
}