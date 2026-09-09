import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { formatPrice } from "../lib/currency";
import { hasSupabaseConfig } from "../lib/supabase";

const emptyProduct = {
  name: "",
  category: "Birthday",
  price: "",
  description: "",
  image: "",
  tag: "New today",
};

const ADMIN_ID = "01614326888";
const ADMIN_PASSWORD = "admin";
const ADMIN_SESSION_KEY = "emulsion-admin-session";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "true",
  );
  const {
    products,
    categories,
    databaseError,
    addProduct,
    updateProduct: saveProduct,
    addCategory,
    removeProduct,
    updateProductAvailability,
  } = useProducts();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All celebrations");
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [editingProductId, setEditingProductId] = useState(null);
  const [savedMessage, setSavedMessage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [loginDetails, setLoginDetails] = useState({ id: "", password: "" });
  const [loginError, setLoginError] = useState("");

  function submitLogin(event) {
    event.preventDefault();
    if (
      loginDetails.id.trim() === ADMIN_ID &&
      loginDetails.password.trim() === ADMIN_PASSWORD
    ) {
      window.sessionStorage.setItem(ADMIN_SESSION_KEY, "true");
      setIsAuthenticated(true);
      setLoginError("");
      return;
    }
    setLoginError("Incorrect admin ID or password.");
  }

  function logout() {
    window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setIsAuthenticated(false);
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        details={loginDetails}
        setDetails={setLoginDetails}
        error={loginError}
        onSubmit={submitLogin}
      />
    );
  }

  const normalizedQuery = query.trim().toLowerCase();
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeCategory === "All celebrations" ||
      product.category === activeCategory;
    const matchesQuery =
      !normalizedQuery ||
      `${product.name} ${product.category}`
        .toLowerCase()
        .includes(normalizedQuery);
    return matchesCategory && matchesQuery;
  });

  const availableCount = products.filter(
    (product) => product.available !== false,
  ).length;
  const averagePrice = Math.round(
    products.reduce((sum, product) => sum + product.price, 0) / products.length,
  );

  async function toggleStock(id) {
    const product = products.find((item) => item.id === id);
    try {
      await updateProductAvailability(id, product?.available === false);
    } catch (error) {
      console.error("Unable to update product availability", error);
      setSavedMessage("Could not update product availability");
    }
  }

  function updateProduct(event) {
    const { name, value } = event.target;
    setNewProduct((current) => ({ ...current, [name]: value }));
  }

  function updateProductImage(event) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () =>
      setNewProduct((current) => ({ ...current, image: reader.result }));
    reader.readAsDataURL(file);
  }

  async function submitProduct(event) {
    event.preventDefault();
    try {
      if (editingProductId === null) {
        await addProduct(newProduct);
        setSavedMessage("Product added to the collection");
      } else {
        await saveProduct(editingProductId, newProduct);
        setSavedMessage("Product updated");
      }
      setNewProduct(emptyProduct);
      setEditingProductId(null);
    } catch (error) {
      console.error("Unable to save product", error);
      setSavedMessage("Could not save product");
    }
    window.setTimeout(() => setSavedMessage(""), 3000);
  }

  function editProduct(product) {
    setNewProduct({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
      image: product.image,
      tag: product.tag,
    });
    setEditingProductId(product.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function cancelEdit() {
    setNewProduct(emptyProduct);
    setEditingProductId(null);
  }

  async function submitCategory(event) {
    event.preventDefault();
    try {
      if (await addCategory(categoryName)) {
      setCategoryName("");
      setSavedMessage("Category created");
      }
    } catch (error) {
      console.error("Unable to create category", error);
      setSavedMessage("Could not create category");
    }
    window.setTimeout(() => setSavedMessage(""), 3000);
  }

  async function deleteProduct(product) {
    if (window.confirm(`Delete ${product.name}? This cannot be undone.`)) {
      try {
        await removeProduct(product.id);
        setSavedMessage("Product deleted");
      } catch (error) {
        console.error("Unable to delete product", error);
        setSavedMessage("Could not delete product");
      }
      window.setTimeout(() => setSavedMessage(""), 3000);
    }
  }

  return (
    <main className="min-h-[calc(100vh-8rem)] bg-[#f1e8dc] px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-350">
        <div className="flex flex-col justify-between gap-5 border-b border-[#2b241e]/15 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
              Emulsion bakery / Admin
            </p>
            <div className="flex flex-wrap items-end gap-5">
              <h1 className="mt-3 font-serif text-5xl tracking-tight sm:text-6xl md:text-8xl">
                Good morning, baker.
              </h1>
              <button
                type="button"
                onClick={logout}
                className="mb-2 text-[10px] font-bold uppercase tracking-[0.16em] text-[#a75d4c] underline underline-offset-4 hover:text-[#7e352d]"
              >
                Log out
              </button>
            </div>
          </div>
          <p className="max-w-xs text-sm leading-6 opacity-60">
            Manage your celebration collection and keep today&apos;s counter
            ready.
          </p>
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <Stat
            label="Total products"
            value={products.length}
            detail="In the collection"
          />
          <Stat
            label="Available now"
            value={availableCount}
            detail="Ready to order"
            accent
          />
          <Stat
            label="Categories"
            value={categories.length - 1}
            detail="Celebration types"
          />
          <Stat
            label="Average price"
            value={formatPrice(averagePrice)}
            detail="Across all bakes"
          />
        </div>

        <div
          className={`mt-5 border px-4 py-3 text-xs ${!hasSupabaseConfig || databaseError ? "border-[#a75d4c]/40 bg-[#f8e1d8] text-[#7e352d]" : "border-[#4d9a72]/40 bg-[#e5f1e8] text-[#285447]"}`}
          role="status"
        >
          {!hasSupabaseConfig
            ? "Local mode: add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env, then restart the dev server. Changes are currently saved only in this browser."
            : databaseError
              ? `Database error: ${databaseError}. Run supabase/schema.sql in Supabase SQL Editor.`
              : "Database connected: changes are shared across devices."}
        </div>

        <section className="mt-10 border border-[#2b241e]/15 bg-[#285447] p-5 text-[#fff7ed] md:p-7">
          <div className="flex flex-col justify-between gap-3 border-b border-[#fff7ed]/20 pb-5 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#f3c877]">
                Add to collection
              </p>
              <h2 className="mt-1 font-serif text-3xl">
                {editingProductId === null ? "Upload a new product" : "Edit product"}
              </h2>
            </div>
            {savedMessage && (
              <p className="text-xs text-[#f3c877]">✓ {savedMessage}</p>
            )}
          </div>
          <form
            onSubmit={submitProduct}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >
            <AdminField
              label="Product name"
              name="name"
              value={newProduct.name}
              onChange={updateProduct}
              placeholder="e.g. Rose Gold Birthday Cake"
            />
            <div>
              <label
                htmlFor="category"
                className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#fff7ed]/75"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={newProduct.category}
                onChange={updateProduct}
                className="w-full border-b border-[#fff7ed]/30 bg-transparent py-3 text-sm outline-none"
              >
                {categories.slice(1).map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="text-[#2b241e]"
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <AdminField
              label="Price (৳)"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={newProduct.price}
              onChange={updateProduct}
              placeholder="0.00"
            />
            <AdminField
              label="Product tag"
              name="tag"
              value={newProduct.tag}
              onChange={updateProduct}
              placeholder="New today"
            />
            <div className="md:col-span-2">
              <label
                htmlFor="description"
                className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#fff7ed]/75"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={updateProduct}
                required
                rows="2"
                placeholder="Describe the product for customers"
                className="w-full resize-none border-b border-[#fff7ed]/30 bg-transparent py-3 text-sm outline-none placeholder:text-[#fff7ed]/40 focus:border-[#f3c877]"
              />
            </div>
            <AdminField
              label="Image URL"
              name="image"
              type="url"
              value={
                newProduct.image.startsWith("data:") ? "" : newProduct.image
              }
              onChange={updateProduct}
              placeholder="https://..."
            />
            <div>
              <label
                htmlFor="image-file"
                className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#fff7ed]/75"
              >
                Or upload image
              </label>
              <input
                id="image-file"
                type="file"
                accept="image/*"
                onChange={updateProductImage}
                className="w-full py-2 text-xs text-[#fff7ed]/70 file:mr-3 file:border-0 file:bg-[#f3c877] file:px-3 file:py-2 file:text-[10px] file:font-bold file:uppercase file:text-[#285447]"
              />
            </div>
            <div className="flex items-end md:col-span-2">
              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="bg-[#f3c877] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#285447] transition hover:bg-[#fff7ed]"
                >
                  {editingProductId === null ? "Add product ↗" : "Save changes ↗"}
                </button>
                {editingProductId !== null && (
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="border border-[#fff7ed]/40 px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#fff7ed] transition hover:border-[#fff7ed]"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
          <form
            onSubmit={submitCategory}
            className="mt-8 flex flex-col gap-3 border-t border-[#fff7ed]/20 pt-6 sm:flex-row sm:items-end"
          >
            <div className="flex-1">
              <label
                htmlFor="new-category"
                className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#fff7ed]/75"
              >
                Create new category
              </label>
              <input
                id="new-category"
                value={categoryName}
                onChange={(event) => setCategoryName(event.target.value)}
                required
                placeholder="e.g. Baby shower"
                className="w-full border-b border-[#fff7ed]/30 bg-transparent py-3 text-sm outline-none placeholder:text-[#fff7ed]/40 focus:border-[#f3c877]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#fff7ed] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.16em] text-[#285447] transition hover:bg-[#f3c877]"
            >
              Create category +
            </button>
          </form>
        </section>

        <section className="mt-10 overflow-hidden border border-[#2b241e]/15 bg-[#f8f3ed]">
          <div className="flex flex-col gap-4 border-b border-[#2b241e]/15 p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#c96f4a]">
                Product catalogue
              </p>
              <h2 className="mt-1 font-serif text-3xl">Your bakes</h2>
            </div>
            <label className="flex w-full max-w-md min-w-0 items-center gap-3 border-b border-[#2b241e]/30 py-2 text-sm">
              <span className="text-base opacity-50">⌕</span>
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search products"
                aria-label="Search products"
                className="w-full bg-transparent outline-none placeholder:opacity-40"
              />
            </label>
          </div>
          <div className="flex gap-5 overflow-x-auto border-b border-[#2b241e]/15 px-5 pt-4 text-[10px] font-bold uppercase tracking-[0.15em] md:px-6">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap border-b-2 pb-4 transition ${activeCategory === category ? "border-[#c96f4a] text-[#c96f4a]" : "border-transparent opacity-50 hover:opacity-100"}`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-170 text-left text-sm">
              <thead className="bg-[#eadbc6]/45 text-[10px] uppercase tracking-[0.15em] opacity-60">
                <tr>
                  <th className="px-5 py-4 font-bold md:px-6">Product</th>
                  <th className="px-5 py-4 font-bold md:px-6">Category</th>
                  <th className="px-5 py-4 font-bold md:px-6">Price</th>
                  <th className="px-5 py-4 font-bold md:px-6">Status</th>
                  <th className="px-5 py-4 font-bold md:px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2b241e]/10">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="transition hover:bg-[#eadbc6]/25"
                  >
                    <td className="px-5 py-4 md:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt=""
                          className="h-12 w-12 object-cover"
                        />
                        <span className="font-serif text-lg">
                          {product.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-xs uppercase tracking-[0.12em] opacity-60 md:px-6">
                      {product.category}
                    </td>
                    <td className="px-5 py-4 md:px-6">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-5 py-4 md:px-6">
                      <span
                        className={`inline-flex items-center gap-2 text-xs ${product.available !== false ? "text-[#285447]" : "text-[#a75d4c]"}`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${product.available !== false ? "bg-[#4d9a72]" : "bg-[#a75d4c]"}`}
                        />
                        {product.available !== false ? "Available" : "Paused"}
                      </span>
                    </td>
                    <td className="px-5 py-4 md:px-6">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => editProduct(product)}
                          className="text-[10px] font-bold uppercase tracking-[0.12em] underline underline-offset-4 hover:text-[#c96f4a]"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => toggleStock(product.id)}
                          className="text-[10px] font-bold uppercase tracking-[0.12em] underline underline-offset-4 hover:text-[#c96f4a]"
                        >
                          {product.available !== false
                            ? "Pause"
                            : "Make available"}
                        </button>
                        <button
                          onClick={() => deleteProduct(product)}
                          className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#a75d4c] underline underline-offset-4 hover:text-[#7e352d]"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredProducts.length === 0 && (
              <div className="px-6 py-16 text-center">
                <p className="font-serif text-2xl">No products found.</p>
                <p className="mt-2 text-sm opacity-60">
                  Try another search or category.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}

function AdminField({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  min,
  step,
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em] text-[#fff7ed]/75"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        step={step}
        required
        className="w-full border-b border-[#fff7ed]/30 bg-transparent py-3 text-sm outline-none placeholder:text-[#fff7ed]/40 focus:border-[#f3c877]"
      />
    </div>
  );
}

function AdminLogin({ details, setDetails, error, onSubmit }) {
  const [showPassword, setShowPassword] = useState(false);

  function updateField(event) {
    const { name, value } = event.target;
    setDetails((current) => ({ ...current, [name]: value }));
  }

  return (
    <main className="flex min-h-[calc(100vh-8rem)] items-center justify-center bg-[#f1e8dc] px-5 py-12">
      <div className="w-full max-w-md border border-[#2b241e]/15 bg-[#f8f3ed] p-6 shadow-[0_16px_40px_rgba(43,36,30,0.08)] md:p-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c96f4a]">
          Emulsion bakery / Private area
        </p>
        <h1 className="mt-4 font-serif text-5xl leading-none tracking-tight">
          Admin sign in.
        </h1>
        <p className="mt-4 text-sm leading-6 opacity-60">
          Enter your admin details to manage products and categories.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label
              htmlFor="admin-id"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em]"
            >
              Admin ID
            </label>
            <input
              id="admin-id"
              name="id"
              value={details.id}
              onChange={updateField}
              required
              autoComplete="username"
              className="w-full border-b border-[#2b241e]/30 bg-transparent py-3 text-sm outline-none focus:border-[#c96f4a]"
            />
          </div>
          <div>
            <label
              htmlFor="admin-password"
              className="mb-2 block text-[10px] font-bold uppercase tracking-[0.16em]"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={details.password}
                onChange={updateField}
                required
                autoComplete="current-password"
                className="w-full border-b border-[#2b241e]/30 bg-transparent py-3 pr-16 text-sm outline-none focus:border-[#c96f4a]"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute right-0 top-2 py-2 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a75d4c] hover:text-[#7e352d]"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          {error && (
            <p role="alert" className="text-sm text-[#a75d4c]">
              {error}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-[#285447] py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-white transition hover:bg-[#c96f4a]"
          >
            Enter admin
          </button>
        </form>
      </div>
    </main>
  );
}

function Stat({ label, value, detail, accent = false }) {
  return (
    <div
      className={`border p-5 ${accent ? "border-[#c96f4a]/40 bg-[#eadbc6]" : "border-[#2b241e]/15 bg-[#f8f3ed]"}`}
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.16em] opacity-55">
        {label}
      </p>
      <p className="mt-4 font-serif text-4xl">{value}</p>
      <p className="mt-1 text-xs opacity-50">{detail}</p>
    </div>
  );
}
