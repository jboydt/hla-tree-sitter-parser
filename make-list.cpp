#include <fstream>
#include <iostream>
#include <sstream>
#include <string>
#include <vector>
using std::cout;
using std::endl;
using std::ifstream;
using std::ostringstream;
using std::string;
using std::vector;

bool readFile(string filename, vector<string>& contents) {
  ifstream fin(filename);
  if (!fin.is_open()) {
    return false;
  }

  string line;
  while(getline(fin, line)) {
    if (line.size() > 0) {
      contents.push_back(line);
    }
  }
  return true;
}

string makeList(const vector<string>& contents) {
  ostringstream next, output;

  for (string s : contents) {
    next << '\'' << s << "\',";
    if (next.str().size() > 60) {
      next << '\n';
      output << next.str();
      next.str("");
    }
  }
  if (next.str().size() > 0) {
    output << next.str();
  }

  string result(output.str());
  return result.substr(0, result.size()-1);
}

int main(int argc, char* argv[]) {
  if (argc != 2) {
    cout << "Usage: " << argv[0] << " FILE" << endl;
  } else {
      vector<string> contents;
      if (!readFile(argv[1], contents)) {
        cout << "Unable to open " << argv[1] << endl;
      } else {
        string asList = makeList(contents);
        cout << asList << endl;
      }
  }

  return 0;
}
