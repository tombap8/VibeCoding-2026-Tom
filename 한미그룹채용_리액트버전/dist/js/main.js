(function () {
        if (!("IntersectionObserver" in window)) return;

        var revealSelector = [
          ".mirae-title",
          ".mirae-scene",
          ".history-head",
          ".history-block",
          ".history-foot",
          ".jobs-head",
          ".jobs-card",
          ".jobs-cta-wrap",
          ".innovation-head",
          ".innovation-board",
          ".welfare-head",
          ".welfare-intro",
          ".welfare-card",
          ".tasks-intro",
          ".tasks-tabs",
          ".tasks-content > *",
          ".requirement-title",
          ".requirement-eligibility-item",
          ".requirement-conditions",
          ".requirement-notice",
          ".requirement-process-group",
          ".exposition-title",
          ".exposition-description",
          ".exposition-hint",
          ".exposition-tab",
          ".exposition-region",
          ".exposition-date-card",
          ".con8-card",
        ].join(", ");
        var previousScrollY = window.scrollY;
        var scrollDirection = "down";
        window.addEventListener(
          "scroll",
          function () {
            var currentScrollY = window.scrollY;
            if (currentScrollY !== previousScrollY) {
              scrollDirection =
                currentScrollY > previousScrollY ? "down" : "up";
              previousScrollY = currentScrollY;
            }
          },
          { passive: true },
        );

        var revealObserver = new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (entry.isIntersecting && scrollDirection === "down") {
                entry.target.classList.add("is-revealed");
              } else if (
                !entry.isIntersecting &&
                scrollDirection === "up"
              ) {
                entry.target.classList.remove("is-revealed");
              }
            });
          },
          {
            rootMargin: "-45% 0px -45% 0px",
            threshold: 0,
          },
        );

        function observeRevealTarget(element) {
          if (element.classList.contains("scroll-reveal")) return;
          element.classList.add("scroll-reveal");
          revealObserver.observe(element);
        }

        function observeRevealTargets(root) {
          if (root.nodeType !== Node.ELEMENT_NODE) return;
          if (root.matches(revealSelector)) observeRevealTarget(root);
          root.querySelectorAll(revealSelector).forEach(observeRevealTarget);
        }

        var main = document.querySelector("main");
        observeRevealTargets(main);
        new MutationObserver(function (records) {
          records.forEach(function (record) {
            record.addedNodes.forEach(observeRevealTargets);
          });
        }).observe(main, { childList: true, subtree: true });
      })();

// 1440px 미만 뷰포트에서는 컨테이너 전체를 비율 축소해 레이아웃이 깨지지 않게 한다.
      (function () {
        var root = document.documentElement;
        function fit() {
          // 태블릿/모바일(1024px 이하)은 CSS 반응형 레이아웃을 쓰므로 축소하지 않는다.
          var w = window.innerWidth;
          var s = w <= 1024 ? 1 : Math.min(1, w / 1440);
          root.style.setProperty("--scale", s.toFixed(4));
        }
        fit();
        window.addEventListener("resize", fit);

        // 모바일 햄버거 메뉴
        var toggle = document.querySelector(".btn-menu");
        var closeBtn = document.querySelector(".btn-close");
        var gnb = document.getElementById("gnb");
        var siteHeader = document.querySelector(".site-header");
        function setMenu(open) {
          gnb.classList.toggle("is-open", open);
          root.classList.toggle("menu-open", open);
          toggle.setAttribute("aria-expanded", open ? "true" : "false");
          if (open) closeBtn.focus();
          else if (gnb.contains(document.activeElement)) toggle.focus();
        }
        toggle.addEventListener("click", function () {
          setMenu(true);
        });
        closeBtn.addEventListener("click", function () {
          setMenu(false);
        });
        gnb.querySelectorAll("a").forEach(function (a) {
          a.addEventListener("click", function () {
            setMenu(false);
          }); // 스크롤 잠금 해제 후 아래 앵커 이동 실행
        });
        document.addEventListener("keydown", function (e) {
          if (e.key === "Escape" && gnb.classList.contains("is-open"))
            setMenu(false);
        });
        var mq = window.matchMedia("(max-width: 390px)");
        function onMq(e) {
          if (!e.matches) setMenu(false);
        }
        if (mq.addEventListener) mq.addEventListener("change", onMq);
        else mq.addListener(onMq);

        var previousScrollY = window.scrollY;
        var scrollTicking = false;
        function updateHeaderOnScroll() {
          var currentScrollY = window.scrollY;
          var scrollDelta = currentScrollY - previousScrollY;
          previousScrollY = currentScrollY;

          if (gnb.classList.contains("is-open")) {
            siteHeader.classList.remove("is-hidden");
            scrollTicking = false;
            return;
          }

          if (currentScrollY <= siteHeader.offsetHeight) {
            siteHeader.classList.remove("is-hidden");
            siteHeader.classList.remove("is-scrolled");
          } else {
            siteHeader.classList.add("is-scrolled");
            if (scrollDelta > 4) {
              siteHeader.classList.add("is-hidden");
            } else if (scrollDelta < -4) {
              siteHeader.classList.remove("is-hidden");
            }
          }
          scrollTicking = false;
        }
        window.addEventListener(
          "scroll",
          function () {
            if (scrollTicking) return;
            scrollTicking = true;
            window.requestAnimationFrame(updateHeaderOnScroll);
          },
          { passive: true },
        );

        // 앵커 이동: 대상 섹션이 있을 때만 부드럽게 스크롤
        document.querySelectorAll('a[href^="#"]').forEach(function (a) {
          a.addEventListener("click", function (e) {
            var id = a.getAttribute("href");
            var target = id.length > 1 ? document.querySelector(id) : null;
            if (target) {
              e.preventDefault();
              target.scrollIntoView({
                behavior: window.isPageScrollSmoothingEnabled()
                  ? "smooth"
                  : "auto",
              });
            }
          });
        });
      })();

      // 히스토리 섹션: 펼치기/접기 (초기 상태 = 전체 높이의 2/3만 노출 + 하단 페이드아웃)
      (function () {
        var COLLAPSE_RATIO = 2 / 3; // 접힘 시 노출 비율 (필요 시 여기만 조정)
        var section = document.getElementById("history");
        if (!section) return;
        var body = document.getElementById("history-body");
        var flow = section.querySelector(".history-flow");
        var btn = section.querySelector(".history-toggle");
        var label = btn.querySelector(".history-toggle-label");
        var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
        var collapsed = false;

        function fullHeight() {
          // 절대배치 데코가 scrollHeight 를 부풀리지 않도록 흐름 콘텐츠 높이를 기준으로 계산
          return flow.offsetHeight;
        }
        function collapsedHeight() {
          return Math.round(fullHeight() * COLLAPSE_RATIO);
        }
        function render() {
          section.classList.toggle("is-collapsed", collapsed);
          section.classList.toggle("is-expanded", !collapsed);
          btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
          label.textContent = collapsed ? "펼치기" : "접기";
        }
        function collapse() {
          collapsed = true;
          // max-height:none → px 로 고정해야 transition 이 동작
          body.style.maxHeight = fullHeight() + "px";
          void body.offsetHeight; // reflow
          body.style.maxHeight = collapsedHeight() + "px";
          render();
          // 접힐 때 시선이 엉뚱한 곳에 머물지 않도록 섹션 상단으로 이동
          if (section.getBoundingClientRect().top < 0) {
            section.scrollIntoView({
              behavior: window.isPageScrollSmoothingEnabled()
                ? "smooth"
                : "auto",
              block: "start",
            });
          }
        }
        function expand() {
          collapsed = false;
          body.style.maxHeight = fullHeight() + "px";
          render();
          function done(e) {
            if (e && e.propertyName !== "max-height") return;
            body.removeEventListener("transitionend", done);
            if (!collapsed) body.style.maxHeight = "none"; // 이후 리사이즈 시 자연 높이 유지
          }
          if (reduce.matches) done();
          else body.addEventListener("transitionend", done);
        }

        btn.addEventListener("click", function () {
          if (collapsed) expand();
          else collapse();
        });

        // 초기 상태: 접힘 (JS 미동작 시에는 전체 펼침 상태로 폴백)
        body.style.transition = "none";
        collapsed = true;
        body.style.maxHeight = collapsedHeight() + "px";
        render();
        void body.offsetHeight;
        body.style.transition = "";

        // 폰트/이미지 로딩·리사이즈로 높이가 바뀌면 접힘 높이 재계산
        function refit() {
          if (collapsed) {
            body.style.transition = "none";
            body.style.maxHeight = collapsedHeight() + "px";
            void body.offsetHeight;
            body.style.transition = "";
          }
        }
        if (window.ResizeObserver) new ResizeObserver(refit).observe(flow);
        else window.addEventListener("resize", refit);
      })();

      // 복지 섹션: JSON의 그룹과 항목으로 카드 목록을 구성한다.
      (function () {
        var section = document.getElementById("welfare");
        if (!section) return;
        var list = section.querySelector(".welfare-list");
        var dataError = section.querySelector(".welfare-data-error");

        function isText(value) {
          return typeof value === "string" && value.trim().length > 0;
        }

        function renderBenefits(groups) {
          var fragment = document.createDocumentFragment();
          groups.forEach(function (group) {
            var introItem = document.createElement("li");
            var intro = document.createElement("div");
            var heading = document.createElement("h3");
            var note = document.createElement("p");
            introItem.className = "welfare-list-intro";
            intro.className = "welfare-intro";
            heading.className = "welfare-subtitle";
            heading.textContent = group.group_title;
            note.className = "welfare-note";
            note.textContent = group.group_description;
            intro.append(heading, note);
            introItem.appendChild(intro);
            fragment.appendChild(introItem);

            group.items.forEach(function (benefit) {
              var item = document.createElement("li");
              var card = document.createElement("article");
              var copy = document.createElement("div");
              var title = document.createElement("h4");
              var description = document.createElement("p");
              item.appendChild(card);
              card.className = "welfare-card";
              copy.className = "welfare-card-copy";
              title.className = "welfare-card-title";
              title.textContent = benefit.title;
              description.className = "welfare-card-description";
              description.textContent = benefit.description;
              copy.append(title, description);
              card.appendChild(copy);

              if (benefit.icon) {
                var icon = document.createElement("img");
                icon.className = "welfare-card-icon";
                icon.src = benefit.icon;
                icon.alt = benefit.icon_alt;
                card.appendChild(icon);
              }
              fragment.appendChild(item);
            });
          });
          list.replaceChildren(fragment);
        }

        fetch("./data/benefits.json")
          .then(function (response) {
            if (!response.ok) {
              throw new Error(
                "복지 데이터 요청 실패: HTTP " + response.status,
              );
            }
            return response.json();
          })
          .then(function (data) {
            if (!data || !Array.isArray(data.benefits) || !data.benefits.length) {
              throw new Error("복지 데이터에 benefits 그룹 배열이 없습니다.");
            }
            data.benefits.forEach(function (group) {
              if (
                !group ||
                !isText(group.group_title) ||
                !isText(group.group_description) ||
                !Array.isArray(group.items) ||
                !group.items.length
              ) {
                throw new Error("복지 그룹 데이터의 필수 항목이 누락되었습니다.");
              }
              group.items.forEach(function (benefit) {
                if (
                  !benefit ||
                  !isText(benefit.title) ||
                  !isText(benefit.description) ||
                  (benefit.icon &&
                    (!isText(benefit.icon) || !isText(benefit.icon_alt)))
                ) {
                  throw new Error("복지 항목 데이터의 필수 항목이 누락되었습니다.");
                }
              });
            });
            renderBenefits(data.benefits);
          })
          .catch(function (error) {
            console.error("복지 데이터를 불러오지 못했습니다.", error);
            dataError.textContent =
              "복지 데이터를 불러오지 못했습니다. 페이지를 웹 서버에서 열고 다시 시도해 주세요.";
            dataError.hidden = false;
          });
      })();

      // 직무 분야 탭, 소속별 아코디언, 직무 상세 모달
      (function () {
        var categories = [
          {
            name: "R&D",
            departments: [
              {
                name: "연구센터 (경기도 동탄)",
                count: "6",
                roles: [
                  { title: "NCE (New Chemical Entity)" },
                  { title: "QS&F (Quality Science & Formulation)" },
                  { title: "MST (Manufacturing Science Technology)" },
                  { title: "TE (Toxicology Evaluation)" },
                  { title: "DST (Drug Science & Technology)" },
                  { title: "BSS (Biological & Structural Evaluation Science)" },
                ],
              },
              {
                name: "제제연구소 [의약혁신센터] (경기도 광교)",
                count: "1",
                roles: [{ title: "신제형연구 (전문연구요원)" }],
              },
            ],
          },
          {
            name: "생산/품질",
            departments: [
              {
                name: "팔탄제조센터 (경기도 화성)",
                count: "4",
                roles: [
                  { title: "제조" },
                  { title: "포장" },
                  { title: "품질관리" },
                  { title: "기술지원" },
                ],
              },
              {
                name: "평택제조센터 (경기도 평택)",
                count: "2",
                roles: [
                  { title: "DS생산 (학사)" },
                  { title: "DS생산 (전문학사)" },
                ],
              },
            ],
          },
          {
            name: "영업",
            departments: [
              {
                name: "전국 (Mobile Office)",
                count: "1",
                roles: [{ title: "제약영업" }],
              },
              {
                name: "본사 (서울시 송파구)",
                count: "2",
                roles: [{ title: "해외영업" }, { title: "IT솔루션영업" }],
              },
            ],
          },
          {
            name: "경영관리",
            departments: [
              {
                name: "본사 (서울시 송파구)",
                count: "5",
                roles: [
                  { title: "구매" },
                  { title: "국내법무" },
                  { title: "특허" },
                  { title: "안전관리" },
                  { title: "인사총무" },
                ],
              },
            ],
          },
          {
            name: "임상",
            departments: [
              {
                name: "본사 (서울시 송파구)",
                count: "4",
                roles: [
                  { title: "Pipeline Valuation (신약가치평가)" },
                  { title: "Market Intelligence (신약개발 전략분석)" },
                  { title: "Data Management" },
                  { title: "Biostatistician" },
                ],
              },
            ],
          },
          {
            name: "글로벌",
            departments: [
              {
                name: "본사 (서울시 송파구)",
                count: "2",
                roles: [
                  { title: "Global Regulatory Affairs" },
                  { title: "Licensing" },
                ],
              },
            ],
          },
          {
            name: "헬스케어",
            departments: [
              {
                name: "본사 (서울시 송파구)",
                count: "9",
                roles: [
                  { title: "식품영업" },
                  { title: "식품커머스운영" },
                  { title: "화장품 커머스사업기획" },
                  { title: "화장품 상품기획" },
                  { title: "화장품 홈쇼핑영업/운영" },
                  { title: "화장품 국내영업" },
                  { title: "화장품 해외영업" },
                  { title: "화장품 글로벌마케팅" },
                  { title: "해외이커머스운영" },
                ],
              },
              {
                name: "서울/수도권/영남",
                count: "1",
                roles: [{ title: "의료기기영업" }],
              },
            ],
          },
        ];
        var section = document.querySelector(".tasks");
        if (!section) return;
        var tabs = Array.from(section.querySelectorAll(".tasks-tab"));
        var panel = section.querySelector(".tasks-content");
        var modal = section.querySelector(".tasks-modal");
        var modalImage = section.querySelector(".tasks-modal-image");
        var modalTitle = section.querySelector(".tasks-modal-title");
        var modalCategory = section.querySelector(".tasks-modal-category");
        var modalDepartment = section.querySelector(".tasks-modal-department");
        var modalExperience = section.querySelector(".tasks-modal-experience");
        var modalDuties = section.querySelector(".tasks-modal-duties");
        var modalQualifications = section.querySelector(
          ".tasks-modal-qualifications",
        );
        var modalPreferredSection = section.querySelector(
          ".tasks-modal-preferred-section",
        );
        var modalPreferred = section.querySelector(".tasks-modal-preferred");
        var dataError = section.querySelector(".tasks-data-error");
        var popupJobsPromise = fetch("./data/pop_data.json")
          .then(function (response) {
            if (!response.ok) {
              throw new Error(
                "직무 상세 데이터 요청 실패: HTTP " + response.status,
              );
            }
            return response.json();
          })
          .then(function (records) {
            if (!Array.isArray(records)) {
              throw new Error("직무 상세 데이터 형식이 배열이 아닙니다.");
            }
            var jobs = new Map();
            records.forEach(function (record) {
              if (
                !record ||
                !record.department ||
                !record.location ||
                !record.title ||
                !record.image ||
                !Array.isArray(record.job_description) ||
                !Array.isArray(record.qualifications) ||
                !Array.isArray(record.preferred)
              ) {
                throw new Error("직무 상세 데이터의 필수 항목이 누락되었습니다.");
              }
              var key =
                record.department +
                "\u0000" +
                record.location +
                "\u0000" +
                record.title;
              if (jobs.has(key)) {
                throw new Error("중복된 직무 상세 데이터: " + record.title);
              }
              jobs.set(key, record);
            });

            var missingRoles = [];
            categories.forEach(function (category) {
              category.departments.forEach(function (department) {
                var location = department.name.split(" (")[0];
                department.roles.forEach(function (role) {
                  var key =
                    category.name +
                    "\u0000" +
                    location +
                    "\u0000" +
                    role.title;
                  if (!jobs.has(key)) missingRoles.push(role.title);
                });
              });
            });
            if (missingRoles.length) {
              throw new Error(
                "팝업 데이터에 직무 정보가 없습니다: " +
                  missingRoles.join(", "),
              );
            }
            return jobs;
          })
          .catch(function (error) {
            console.error("직무 상세 데이터를 불러오지 못했습니다.", error);
            dataError.textContent =
              "직무 상세 정보를 불러오지 못했습니다. 페이지를 웹 서버에서 열고 다시 시도해 주세요.";
            dataError.hidden = false;
            return null;
          });

        function addBulletList(list, entries) {
          list.replaceChildren();
          entries.forEach(function (entry) {
            var item = document.createElement("li");
            item.textContent = entry;
            list.appendChild(item);
          });
        }

        function openRole(role) {
          modalImage.src = new URL(
            role.image,
            new URL("./data/pop_data.json", document.baseURI),
          ).href;
          modalTitle.textContent = role.title;
          modalCategory.textContent = role.department;
          modalDepartment.textContent = role.location;
          modalExperience.textContent = role.category;
          addBulletList(modalDuties, role.job_description);
          addBulletList(modalQualifications, role.qualifications);
          addBulletList(modalPreferred, role.preferred);
          modalPreferredSection.hidden = role.preferred.length === 0;
          modal.showModal();
        }

        function renderCategory(categoryIndex) {
          var category = categories[categoryIndex];
          panel.replaceChildren();
          panel.setAttribute("aria-labelledby", "tasks-tab-" + categoryIndex);
          category.departments.forEach(function (department, index) {
            var accordion = document.createElement("section");
            var toggle = document.createElement("button");
            var count = document.createElement("span");
            var content = document.createElement("div");
            var list = document.createElement("ul");
            var panelId = "tasks-panel-" + categoryIndex + "-" + index;

            accordion.className = "tasks-accordion";
            toggle.className = "tasks-department-toggle";
            toggle.type = "button";
            toggle.setAttribute("aria-expanded", "false");
            toggle.setAttribute("aria-controls", panelId);
            toggle.appendChild(document.createTextNode(department.name));
            count.className = "tasks-count";
            count.textContent = department.count;
            toggle.appendChild(count);

            content.className = "tasks-panel";
            content.id = panelId;
            content.inert = true;
            var contentInner = document.createElement("div");
            contentInner.className = "tasks-panel-inner";
            list.className = "tasks-role-list";
            department.roles.forEach(function (role) {
              var item = document.createElement("li");
              var button = document.createElement("button");
              var title = document.createElement("span");
              var arrow = document.createElement("span");
              button.className = "tasks-role-button";
              button.type = "button";
              title.textContent = role.title;
              arrow.className = "tasks-role-arrow";
              arrow.setAttribute("aria-hidden", "true");
              arrow.textContent = "→";
              button.append(title, arrow);
              button.addEventListener("click", function () {
                popupJobsPromise
                  .then(function (jobs) {
                    if (!jobs) return;
                    var key =
                      category.name +
                      "\u0000" +
                      department.name.split(" (")[0] +
                      "\u0000" +
                      role.title;
                    var popupRole = jobs.get(key);
                    if (!popupRole) {
                      throw new Error("직무 상세 데이터를 찾을 수 없습니다: " + role.title);
                    }
                    openRole(popupRole);
                  })
                  .catch(function (error) {
                    console.error("직무 팝업을 표시하지 못했습니다.", error);
                    dataError.textContent =
                      "선택한 직무의 상세 정보를 표시할 수 없습니다.";
                    dataError.hidden = false;
                  });
              });
              item.appendChild(button);
              list.appendChild(item);
            });
            contentInner.appendChild(list);
            content.appendChild(contentInner);
            toggle.addEventListener("click", function () {
              var expanded = toggle.getAttribute("aria-expanded") === "true";
              if (!expanded) {
                panel
                  .querySelectorAll(".tasks-accordion.is-open")
                  .forEach(function (openAccordion) {
                    if (openAccordion === accordion) return;
                    openAccordion.classList.remove("is-open");
                    openAccordion
                      .querySelector(".tasks-department-toggle")
                      .setAttribute("aria-expanded", "false");
                    openAccordion.querySelector(".tasks-panel").inert = true;
                  });
              }
              var nextExpanded = !expanded;
              toggle.setAttribute(
                "aria-expanded",
                nextExpanded ? "true" : "false",
              );
              accordion.classList.toggle("is-open", nextExpanded);
              content.inert = !nextExpanded;
            });
            accordion.append(toggle, content);
            panel.appendChild(accordion);
          });
        }

        function selectTab(tab, focus) {
          var categoryIndex = Number(tab.dataset.category);
          tabs.forEach(function (item) {
            var selected = item === tab;
            item.setAttribute("aria-selected", selected ? "true" : "false");
            item.tabIndex = selected ? 0 : -1;
          });
          renderCategory(categoryIndex);
          if (focus) tab.focus();
          tab.scrollIntoView({
            behavior: window.isPageScrollSmoothingEnabled()
              ? "smooth"
              : "auto",
            block: "nearest",
            inline: "nearest",
          });
        }

        tabs.forEach(function (tab) {
          tab.addEventListener("click", function () {
            selectTab(tab, false);
          });
          tab.addEventListener("keydown", function (event) {
            var index = tabs.indexOf(tab);
            var nextIndex = index;
            if (event.key === "ArrowRight") nextIndex = (index + 1) % tabs.length;
            else if (event.key === "ArrowLeft")
              nextIndex = (index - 1 + tabs.length) % tabs.length;
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = tabs.length - 1;
            else return;
            event.preventDefault();
            selectTab(tabs[nextIndex], true);
          });
        });

        section
          .querySelector(".tasks-modal-close")
          .addEventListener("click", function () {
            modal.close();
          });
        modal.addEventListener("click", function (event) {
          if (event.target === modal) modal.close();
        });
        renderCategory(0);
      })();

      // 지원자격과 전형절차 탭 전환
      (function () {
        var section = document.getElementById("requirement");
        if (!section) return;
        var tabs = Array.from(section.querySelectorAll(".requirement-tab"));
        var panels = tabs.map(function (tab) {
          return document.getElementById(tab.getAttribute("aria-controls"));
        });

        function selectTab(index, focus) {
          tabs.forEach(function (tab, tabIndex) {
            var selected = tabIndex === index;
            tab.setAttribute("aria-selected", selected ? "true" : "false");
            tab.tabIndex = selected ? 0 : -1;
            panels[tabIndex].hidden = !selected;
          });
          if (focus) tabs[index].focus();
        }

        tabs.forEach(function (tab, index) {
          tab.addEventListener("click", function () {
            selectTab(index, false);
          });
          tab.addEventListener("keydown", function (event) {
            var nextIndex = index;
            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
              nextIndex = (index + 1) % tabs.length;
            } else if (
              event.key === "ArrowLeft" ||
              event.key === "ArrowUp"
            ) {
              nextIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
              nextIndex = 0;
            } else if (event.key === "End") {
              nextIndex = tabs.length - 1;
            } else {
              return;
            }
            event.preventDefault();
            selectTab(nextIndex, true);
          });
        });

        selectTab(
          window.location.hash === "#requirement-process" ? 1 : 0,
          false,
        );
      })();

      // 박람회·캠퍼스 일정 탭 및 장소 상세 안내
      (function () {
        var section = document.getElementById("exposition");
        if (!section) return;

        var fairSchedule = [
          { date: "8월 31일 (월)", venues: ["KAIST"] },
          {
            date: "9월 1일 (화)",
            venues: ["서울대학교", "서강대학교", "연세대학교"],
          },
          { date: "9월 2일 (수)", venues: ["UNIST", "한양대학교"] },
          { date: "9월 3일 (목)", venues: ["GIST"] },
          {
            date: "9월 4일 (금)",
            venues: ["고려대학교", "성균관대학교(자연)"],
          },
          { date: "9월 7일 (월)", venues: ["KIST", "동국대학교"] },
          {
            date: "9월 8일 (화)",
            venues: ["이화여자대학교", "중견기업박람회(대전)"],
          },
          { date: "9월 9일 (수)", venues: ["POSTECH"] },
          { date: "", venues: [] },
          { date: "10월 7일 (수)", venues: ["서울고용센터"] },
        ];
        var campusSchedules = null;
        var campusWeekdays = ["일", "월", "화", "수", "목", "금", "토"];
        var tabs = Array.from(section.querySelectorAll(".exposition-tab"));
        var panels = tabs.map(function (tab) {
          return document.getElementById(tab.getAttribute("aria-controls"));
        });
        var regions = Array.from(
          section.querySelectorAll(".exposition-region"),
        );
        var fairGrid = section.querySelector(".exposition-fair-grid");
        var campusSchedulePanel = section.querySelector(
          ".exposition-campus-schedule",
        );

        function createScheduleGrid(schedule, className, type) {
          var grid = document.createElement("div");
          grid.className = className;

          schedule.forEach(function (entry) {
            var card = document.createElement("article");
            var date = document.createElement("h3");
            var venues = document.createElement("div");
            card.className = "exposition-date-card";
            date.className = "exposition-date";
            date.textContent = entry.date;
            if (!entry.date) {
              date.setAttribute("aria-hidden", "true");
            }
            venues.className = "exposition-venues";

            entry.venues.forEach(function (venue) {
              if (type === "fair") {
                var name = document.createElement("span");
                name.className = "exposition-venue exposition-venue--static";
                name.textContent = venue;
                venues.appendChild(name);
              } else {
                var button = document.createElement("button");
                button.className = "exposition-venue";
                button.type = "button";
                button.textContent = venue.name;
                var details = document.createElement("div");
                var locationLabel = document.createElement("span");
                var location = document.createElement("p");
                var timeLabel = document.createElement("span");
                var time = document.createElement("p");
                details.className = "exposition-venue-detail";
                details.hidden = true;
                locationLabel.className = "exposition-venue-detail-label";
                locationLabel.textContent = "⌖ 장소";
                location.className = "exposition-venue-detail-value";
                location.textContent = venue.location;
                timeLabel.className = "exposition-venue-detail-label";
                timeLabel.textContent = "◷ 시간";
                time.className = "exposition-venue-detail-value";
                time.textContent = venue.time;
                details.append(locationLabel, location, timeLabel, time);
                details.tabIndex = -1;
                button.setAttribute("aria-expanded", "false");
                button.addEventListener("click", function () {
                  var willExpand =
                    button.getAttribute("aria-expanded") !== "true";
                  grid
                    .querySelectorAll(".exposition-venue[aria-expanded='true']")
                    .forEach(function (openButton) {
                      openButton.setAttribute("aria-expanded", "false");
                      openButton.nextElementSibling.hidden = true;
                      openButton
                        .closest(".exposition-date-card")
                        .classList.remove("has-details");
                    });
                  if (willExpand) {
                    button.setAttribute("aria-expanded", "true");
                    details.hidden = false;
                    card.classList.add("has-details");
                    details.focus();
                  }
                });
                details.addEventListener("click", function () {
                  button.setAttribute("aria-expanded", "false");
                  details.hidden = true;
                  card.classList.remove("has-details");
                  button.focus();
                });
                card.addEventListener("focusout", function (event) {
                  if (card.contains(event.relatedTarget)) return;
                  button.setAttribute("aria-expanded", "false");
                  details.hidden = true;
                  card.classList.remove("has-details");
                });
                venues.append(button, details);
              }
            });

            card.append(date, venues);
            grid.appendChild(card);
          });
          return grid;
        }

        function renderFairSchedule() {
          var grid = createScheduleGrid(
            fairSchedule,
            "exposition-fair-grid",
            "fair",
          );
          fairGrid.replaceWith(grid);
          fairGrid = grid;
        }

        function renderCampusSchedule(region) {
          var selectedRegion = regions.find(function (button) {
            return button.dataset.region === region;
          });
          if (!selectedRegion || !campusSchedules) return;
          campusSchedulePanel.setAttribute(
            "aria-labelledby",
            selectedRegion.id,
          );
          var regionSchedule = campusSchedules[region];
          var firstDate = new Date(regionSchedule.dates[0]);
          firstDate.setDate(
            firstDate.getDate() - ((firstDate.getDay() + 6) % 7),
          );
          var lastDate = regionSchedule.dates[regionSchedule.dates.length - 1];
          var activeWeeks = new Set(
            regionSchedule.dates.map(function (date) {
              var monday = new Date(date);
              monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
              return monday.getTime();
            }),
          );
          var schedule = [];

          for (
            var date = new Date(firstDate);
            date <= lastDate;
            date.setDate(date.getDate() + 1)
          ) {
            if (date.getDay() === 0 || date.getDay() === 6) continue;

            var monday = new Date(date);
            monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
            if (!activeWeeks.has(monday.getTime())) continue;

            var dateKey = date.getMonth() + 1 + "-" + date.getDate();
            schedule.push({
              date:
                date.getMonth() +
                1 +
                "월 " +
                date.getDate() +
                "일 (" +
                campusWeekdays[date.getDay()] +
                ")",
              venues: regionSchedule.venues[dateKey] || [],
            });
          }

          campusSchedulePanel.replaceChildren(
            createScheduleGrid(
              schedule,
              "exposition-campus-grid",
              "campus",
            ),
          );
        }

        function parseCampusDate(value) {
          var match = /^(\d{1,2})월 (\d{1,2})일 \([^)]+\)$/.exec(value);
          if (!match) {
            throw new Error("잘못된 캠퍼스 일정 날짜입니다: " + value);
          }
          var date = new Date(2026, Number(match[1]) - 1, Number(match[2]));
          if (
            date.getMonth() !== Number(match[1]) - 1 ||
            date.getDate() !== Number(match[2])
          ) {
            throw new Error("잘못된 캠퍼스 일정 날짜입니다: " + value);
          }
          return date;
        }

        function loadCampusSchedules(entries) {
          if (!Array.isArray(entries)) {
            throw new Error("캠퍼스 일정 데이터 형식이 올바르지 않습니다.");
          }

          var schedules = {};
          regions.forEach(function (region) {
            schedules[region.dataset.region] = {
              label: region.textContent.trim(),
              dates: [],
              venues: {},
            };
          });

          entries.forEach(function (entry) {
            var schedule = Object.values(schedules).find(function (candidate) {
              return candidate.label === entry.region;
            });
            if (!schedule) {
              throw new Error("등록되지 않은 캠퍼스 일정 지역입니다: " + entry.region);
            }
            if (!entry.school || !entry.location || !entry.time) {
              throw new Error("캠퍼스 일정 장소 정보가 누락되었습니다.");
            }

            var date = parseCampusDate(entry.date);
            var dateKey = date.getMonth() + 1 + "-" + date.getDate();
            if (!schedule.venues[dateKey]) {
              schedule.venues[dateKey] = [];
              schedule.dates.push(date);
            }
            schedule.venues[dateKey].push({
              name: entry.school,
              location: entry.location,
              time: entry.time,
            });
          });

          Object.values(schedules).forEach(function (schedule) {
            schedule.dates.sort(function (a, b) {
              return a - b;
            });
          });
          return schedules;
        }

        function selectTab(index, focus) {
          tabs.forEach(function (tab, tabIndex) {
            var selected = tabIndex === index;
            tab.setAttribute("aria-selected", selected ? "true" : "false");
            tab.tabIndex = selected ? 0 : -1;
            panels[tabIndex].hidden = !selected;
          });
          if (focus) tabs[index].focus();
        }

        tabs.forEach(function (tab, index) {
          tab.addEventListener("click", function () {
            selectTab(index, false);
          });
          tab.addEventListener("keydown", function (event) {
            var nextIndex = index;
            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
              nextIndex = (index + 1) % tabs.length;
            } else if (
              event.key === "ArrowLeft" ||
              event.key === "ArrowUp"
            ) {
              nextIndex = (index - 1 + tabs.length) % tabs.length;
            } else if (event.key === "Home") {
              nextIndex = 0;
            } else if (event.key === "End") {
              nextIndex = tabs.length - 1;
            } else {
              return;
            }
            event.preventDefault();
            selectTab(nextIndex, true);
          });
        });

        regions.forEach(function (region, index) {
          region.addEventListener("click", function () {
            regions.forEach(function (button) {
              var selected = button === region;
              button.setAttribute(
                "aria-selected",
                selected ? "true" : "false",
              );
              button.tabIndex = selected ? 0 : -1;
            });
            renderCampusSchedule(region.dataset.region);
          });
          region.addEventListener("keydown", function (event) {
            var nextIndex = index;
            if (event.key === "ArrowRight") nextIndex = (index + 1) % regions.length;
            else if (event.key === "ArrowLeft")
              nextIndex = (index - 1 + regions.length) % regions.length;
            else if (event.key === "Home") nextIndex = 0;
            else if (event.key === "End") nextIndex = regions.length - 1;
            else return;
            event.preventDefault();
            regions[nextIndex].focus();
            regions[nextIndex].click();
          });
        });

        renderFairSchedule();
        campusSchedulePanel.textContent = "캠퍼스 일정을 불러오는 중입니다.";
        fetch("./data/campus_recruiting_schedule.json")
          .then(function (response) {
            if (!response.ok) {
              throw new Error(
                "캠퍼스 일정 데이터를 불러오지 못했습니다. (" +
                  response.status +
                  ")",
              );
            }
            return response.json();
          })
          .then(function (entries) {
            campusSchedules = loadCampusSchedules(entries);
            var selectedRegion = regions.find(function (region) {
              return region.getAttribute("aria-selected") === "true";
            });
            renderCampusSchedule(selectedRegion.dataset.region);
          })
          .catch(function (error) {
            console.error("캠퍼스 일정 로딩 실패:", error);
            campusSchedulePanel.textContent =
              "캠퍼스 일정을 불러오지 못했습니다. 잠시 후 다시 확인해 주세요.";
          });
      })();

(function () {
        var countdown = document.querySelector(".con9-countdown");
        if (!countdown) return;

        var deadline = new Date("2026-10-18T23:59:59+09:00").getTime();
        var expiredMessage = document.querySelector(".con9-expired");
        var units = {
          days: countdown.querySelector('[data-countdown="days"]'),
          hours: countdown.querySelector('[data-countdown="hours"]'),
          minutes: countdown.querySelector('[data-countdown="minutes"]'),
          seconds: countdown.querySelector('[data-countdown="seconds"]'),
        };

        function updateCountdown() {
          var remaining = deadline - Date.now();
          if (remaining <= 0) {
            countdown.hidden = true;
            expiredMessage.hidden = false;
            return;
          }
          var totalSeconds = Math.floor(remaining / 1000);
          var values = {
            days: Math.floor(totalSeconds / 86400),
            hours: Math.floor((totalSeconds % 86400) / 3600),
            minutes: Math.floor((totalSeconds % 3600) / 60),
            seconds: totalSeconds % 60,
          };

          Object.keys(units).forEach(function (unit) {
            units[unit].textContent = String(values[unit]).padStart(2, "0");
          });
        }

        updateCountdown();
        window.setInterval(updateCountdown, 1000);
      })();

(function () {
        var heroWalker = document.querySelector(
          ".mirae-scene [data-hanmi-walker]",
        );
        var readingWalker = document.querySelector(
          "[data-hanmi-reading-walker]",
        );
        if (!heroWalker || !readingWalker) {
          throw new Error("캐릭터 애니메이션 캔버스를 찾을 수 없습니다.");
        }
        heroWalker.removeAttribute("data-hanmi-walker");
        readingWalker.setAttribute("data-hanmi-walker", "");
      })();

(function () {
        var toggle = document.getElementById("scroll-smoothing-toggle");
        var reducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        );
        var frameId = null;
        var targetY = window.scrollY;

        function smoothingEnabled() {
          return !toggle.checked && !reducedMotion.matches;
        }

        function stopSmoothing() {
          if (frameId !== null) {
            window.cancelAnimationFrame(frameId);
            frameId = null;
          }
          window.scrollTo(window.scrollX, window.scrollY);
          targetY = window.scrollY;
        }

        function hasScrollableAncestor(target, deltaY) {
          var element =
            target instanceof Element ? target : target.parentElement;
          if (
            element &&
            element.closest("input, textarea, select, [contenteditable='true']")
          ) {
            return true;
          }
          while (element && element !== document.body) {
            var style = window.getComputedStyle(element);
            if (
              /auto|scroll|overlay/.test(style.overflowY) &&
              element.scrollHeight > element.clientHeight
            ) {
              var maxScrollTop =
                element.scrollHeight - element.clientHeight;
              if (
                style.overscrollBehaviorY === "contain" ||
                (deltaY < 0 && element.scrollTop > 0) ||
                (deltaY > 0 && element.scrollTop < maxScrollTop)
              ) {
                return true;
              }
            }
            element = element.parentElement;
          }
          return false;
        }

        function onWheel(event) {
          if (
            !smoothingEnabled() ||
            event.defaultPrevented ||
            event.ctrlKey ||
            !event.deltaY ||
            hasScrollableAncestor(event.target, event.deltaY)
          ) {
            return;
          }

          var deltaY = event.deltaY;
          if (event.deltaMode === WheelEvent.DOM_DELTA_LINE) {
            deltaY *= 16;
          } else if (event.deltaMode === WheelEvent.DOM_DELTA_PAGE) {
            deltaY *= window.innerHeight;
          }

          var maxScrollY = Math.max(
            0,
            document.documentElement.scrollHeight - window.innerHeight,
          );
          if (frameId === null) {
            targetY = Math.max(0, Math.min(window.scrollY, maxScrollY));
          }
          if (
            (deltaY < 0 && targetY <= 0) ||
            (deltaY > 0 && targetY >= maxScrollY)
          ) {
            return;
          }
          event.preventDefault();
          targetY = Math.max(
            0,
            Math.min(targetY + deltaY, maxScrollY),
          );
          if (frameId === null) frameId = window.requestAnimationFrame(animate);
        }

        function animate() {
          frameId = null;
          if (!smoothingEnabled()) {
            stopSmoothing();
            return;
          }
          var distance = targetY - window.scrollY;
          if (Math.abs(distance) < 0.5) {
            window.scrollTo(0, targetY);
            return;
          }
          window.scrollTo(0, window.scrollY + distance * 0.01);
          frameId = window.requestAnimationFrame(animate);
        }

        toggle.checked = reducedMotion.matches;
        toggle.addEventListener("change", stopSmoothing);
        reducedMotion.addEventListener("change", function (event) {
          toggle.checked = event.matches;
          if (event.matches) stopSmoothing();
        });
        window.addEventListener("wheel", onWheel, { passive: false });
        window.addEventListener("touchstart", stopSmoothing, {
          passive: true,
        });
        window.addEventListener("keydown", function (event) {
          if (
            [
              "ArrowDown",
              "ArrowUp",
              "End",
              "Home",
              "PageDown",
              "PageUp",
              " ",
            ].includes(event.key)
          ) {
            stopSmoothing();
          }
        });
        window.isPageScrollSmoothingEnabled = smoothingEnabled;
      })();
